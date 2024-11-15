export class FertilizerCombination {
    constructor() {
        this.fertilizers = {
            Urea: [46, 0, 0],
            DAP: [18, 46, 0],
            MOP: [0, 0, 60],
        };

        this.cropRequirements = [
            { crop_name: "wheat", nitrogen_needed: 120, phosphorus_needed: 50, potassium_needed: 60 },
            { crop_name: "rice", nitrogen_needed: 100, phosphorus_needed: 40, potassium_needed: 30 },
        ];
    }

    getCombination(input) {
        const { cropName, farmArea, n: soilN = 0, p: soilP = 0, k: soilK = 0 } = input;

        const cropRequirement = this.cropRequirements.find(crop => crop.crop_name === cropName);
        if (!cropRequirement) return { message: "Invalid crop name provided." };

        // Calculate net requirements
        const netN = Math.max(cropRequirement.nitrogen_needed - soilN, 0);
        const netP = Math.max(cropRequirement.phosphorus_needed - soilP, 0);
        const netK = Math.max(cropRequirement.potassium_needed - soilK, 0);

        if (netN === 0 && netP === 0 && netK === 0) {
            return { message: "No additional fertilizer required." };
        }

        const remainingRequirements = [netN, netP, netK];
        const categorizedFertilizers = this.categorizeFertilizers();

        // Generate valid fertilizer combinations
        const validCombinations = this.generateCombinations(categorizedFertilizers, farmArea, remainingRequirements);

        // Format response
        const response = validCombinations.map(combination => {
            const details = {};
            for (const [fertName, amount] of Object.entries(combination)) {
                if (amount > 0) details[fertName] = parseFloat((amount * farmArea).toFixed(3));
            }
            return details;
        });

        return response.slice(0, 5); // Return top 5 combinations
    }

    categorizeFertilizers() {
        const npk = {}, np = {}, nk = {}, pk = {}, n = {}, p = {}, k = {};

        for (const [fertName, content] of Object.entries(this.fertilizers)) {
            const [nContent, pContent, kContent] = content;

            if (nContent > 0 && pContent > 0 && kContent > 0) npk[fertName] = content;
            else if (nContent > 0 && pContent > 0) np[fertName] = content;
            else if (nContent > 0 && kContent > 0) nk[fertName] = content;
            else if (pContent > 0 && kContent > 0) pk[fertName] = content;
            else if (nContent > 0) n[fertName] = content;
            else if (pContent > 0) p[fertName] = content;
            else if (kContent > 0) k[fertName] = content;
        }

        return [npk, np, nk, pk, n, p, k];
    }

    generateCombinations(fertilizerGroups, farmArea, remainingRequirements) {
        const combinations = [];

        for (let r = 1; r <= fertilizerGroups.length; r++) {
            const groups = this.getCombinations(fertilizerGroups, r);

            for (const group of groups) {
                const combinedFert = {};
                let combinedRemaining = [...remainingRequirements];

                for (const fertGroup of group) {
                    for (const [fertName, content] of Object.entries(fertGroup)) {
                        const amount = this.calculateFertilizerAmount(combinedRemaining, content);
                        combinedRemaining = this.updateRemainingRequirements(combinedRemaining, content, amount);

                        if (combinedFert[fertName]) combinedFert[fertName] += amount;
                        else combinedFert[fertName] = amount;
                    }
                }

                if (combinedRemaining.every(req => req <= 0)) {
                    combinations.push(combinedFert);
                }
            }
        }

        return combinations;
    }

    getCombinations(arr, size) {
        if (size === 1) return arr.map(el => [el]);
        const combinations = [];
        arr.forEach((current, index) => {
            const smallerCombinations = this.getCombinations(arr.slice(index + 1), size - 1);
            smallerCombinations.forEach(combination => {
                combinations.push([current, ...combination]);
            });
        });
        return combinations;
    }

    calculateFertilizerAmount(remaining, content) {
        const [nContent, pContent, kContent] = content;
        const nFert = nContent > 0 ? remaining[0] / (nContent / 100) : Infinity;
        const pFert = pContent > 0 ? remaining[1] / (pContent / 100) : Infinity;
        const kFert = kContent > 0 ? remaining[2] / (kContent / 100) : Infinity;

        return Math.min(nFert, pFert, kFert);
    }

    updateRemainingRequirements(remaining, content, amount) {
        const [nContent, pContent, kContent] = content;
        return [
            remaining[0] - amount * (nContent / 100),
            remaining[1] - amount * (pContent / 100),
            remaining[2] - amount * (kContent / 100)
        ];
    }
}

// Example usage
// const fertilizers = {
//     Urea: [46, 0, 0],
//     DAP: [18, 46, 0],
//     MOP: [0, 0, 60]
// };

// const cropRequirements = [
//     { crop_name: "Wheat", nitrogen_needed: 120, phosphorus_needed: 50, potassium_needed: 60 },
//     { crop_name: "Rice", nitrogen_needed: 100, phosphorus_needed: 40, potassium_needed: 30 }
// ];

// const farm = new FertilizerCombination(fertilizers, cropRequirements);

// const input = {
//     cropName: "Wheat",
//     farmArea: 1,
//     n: 40,
//     p: 10,
//     k: 20
// };

// console.log('example', farm.getCombination(input));
