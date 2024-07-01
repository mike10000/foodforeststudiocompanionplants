const CELL_SIZE = 30;
const ACRE_TO_SQ_FT = 43560;
const CELL_AREA = 9 * 9; // Each cell represents 9x9 feet

function getPlantRepresentation(plant) {
    const baseSize = CELL_SIZE / 3;
    const layerConfig = {
        'Canopy': { color: '#228B22', sizeFactor: 2.5 },
        'Sub-canopy': { color: '#32CD32', sizeFactor: 2 },
        'Shrub': { color: '#90EE90', sizeFactor: 1.5 },
        'Herbaceous': { color: '#98FB98', sizeFactor: 1 },
        'Ground Cover': { color: '#00FA9A', sizeFactor: 0.8 },
        'Vine': { color: '#3CB371', sizeFactor: 1.2 },
        'Root': { color: '#964B00', sizeFactor: 0.7 }
    };

    const config = layerConfig[plant.layer] || { color: '#000000', sizeFactor: 1 };
    return {
        color: config.color,
        size: baseSize * config.sizeFactor
    };
}

const companionRelationships = {
    'Apple Tree': ['Nasturtium', 'Comfrey', 'Garlic'],
    'Pear Tree': ['Garlic', 'Comfrey', 'Daffodils'],
    'Cherry Tree': ['Marigold', 'Chives', 'Dandelion'],
    'Plum Tree': ['Comfrey', 'Nasturtium', 'Allium'],
    'Peach Tree': ['Garlic', 'Tansy', 'Borage'],
    'Apricot Tree': ['Basil', 'Tansy', 'Yarrow'],
    'Fig Tree': ['Comfrey', 'Nasturtium', 'Borage'],
    'Pomegranate': ['Lavender', 'Rosemary', 'Thyme'],
    'Lemon Tree': ['Lavender', 'Marigold', 'Garlic'],
    'Orange Tree': ['Nasturtium', 'Comfrey', 'Lemon Balm'],
    'Avocado': ['Lemon', 'Comfrey', 'Nasturtium'],
    'Banana': ['Sweet Potato', 'Lemongrass', 'Taro'],
    'Papaya': ['Sweet Potato', 'Lemongrass', 'Marigold'],
    'Mango Tree': ['Papaya', 'Banana', 'Lemongrass'],
    'Coconut Palm': ['Banana', 'Papaya', 'Sweet Potato'],
    'Blueberry': ['Strawberry', 'Rhododendron', 'Pine'],
    'Raspberry': ['Garlic', 'Tansy', 'Yarrow'],
    'Blackberry': ['Tansy', 'Borage', 'Comfrey'],
    'Strawberry': ['Borage', 'Lettuce', 'Spinach'],
    'Grape': ['Hyssop', 'Chives', 'Mulberry'],
    'Kiwi': ['Comfrey', 'Yarrow', 'Nasturtium'],
    'Passion Fruit': ['Banana', 'Sweet Potato', 'Marigold'],
    'Elderberry': ['Comfrey', 'Yarrow', 'Mint'],
    'Goji Berry': ['Marigold', 'Borage', 'Yarrow'],
    'Currant': ['Comfrey', 'Tansy', 'Beans'],
    'Gooseberry': ['Tomato', 'Tansy', 'Oregano'],
    'Hazelnut': ['Comfrey', 'Yarrow', 'Daffodils'],
    'Almond': ['Yarrow', 'Borage', 'Lavender'],
    'Pecan': ['Clover', 'Vetch', 'Native grasses'],
    'Walnut': ['Comfrey', 'Daffodils', 'Bluebells'],
    'Chestnut': ['Comfrey', 'Yarrow', 'Clover'],
    'Macadamia Nut': ['Pigeon Pea', 'Comfrey', 'Sweet Potato'],
    'Coffee': ['Banana', 'Avocado', 'Macadamia'],
    'Cacao': ['Banana', 'Vanilla', 'Cardamom'],
    'Tea': ['Lemongrass', 'Ginger', 'Comfrey'],
    'Olive Tree': ['Lavender', 'Rosemary', 'Thyme'],
    'Persimmon': ['Comfrey', 'Yarrow', 'Wild Strawberry'],
    'Mulberry': ['Comfrey', 'Borage', 'Strawberry'],
    'Loquat': ['Nasturtium', 'Comfrey', 'Chives'],
    'Guava': ['Lemongrass', 'Marigold', 'Chili Pepper'],
    'Feijoa': ['Comfrey', 'Borage', 'Nasturtium'],
    'Pawpaw': ['Comfrey', 'Wild Ginger', 'Spicebush'],
    'Soursop': ['Papaya', 'Banana', 'Pigeon Pea'],
    'Jackfruit': ['Pineapple', 'Turmeric', 'Ginger'],
    'Breadfruit': ['Taro', 'Sweet Potato', 'Cassava'],
    'Durian': ['Rambutan', 'Mangosteen', 'Jackfruit'],
    'Rambutan': ['Durian', 'Mangosteen', 'Lychee'],
    'Longan': ['Lychee', 'Rambutan', 'Mango'],
    'Lychee': ['Longan', 'Rambutan', 'Mango'],
    'Mangosteen': ['Durian', 'Rambutan', 'Coconut Palm'],
    'Dragon Fruit': ['Moringa', 'Pigeon Pea', 'Lemongrass'],
    'Carambola': ['Papaya', 'Banana', 'Pineapple'],
    'Jaboticaba': ['Guava', 'Surinam Cherry', 'Grumichama'],
    'Açaí Palm': ['Banana', 'Cupuaçu', 'Peach Palm'],
    'Cupuaçu': ['Açaí Palm', 'Banana', 'Peach Palm'],
    'Peach Palm': ['Açaí Palm', 'Cupuaçu', 'Banana'],
    'Vanilla': ['Cacao', 'Black Pepper', 'Turmeric'],
    'Black Pepper': ['Coffee', 'Vanilla', 'Cardamom'],
    'Cinnamon': ['Clove', 'Nutmeg', 'Allspice'],
    'Clove': ['Nutmeg', 'Cinnamon', 'Allspice'],
    'Nutmeg': ['Cinnamon', 'Clove', 'Banana'],
    'Allspice': ['Cacao', 'Banana', 'Vanilla'],
    'Cardamom': ['Ginger', 'Turmeric', 'Black Pepper'],
    'Turmeric': ['Ginger', 'Galangal', 'Cardamom'],
    'Ginger': ['Turmeric', 'Galangal', 'Cardamom'],
    'Galangal': ['Ginger', 'Turmeric', 'Lemongrass'],
    'Lemongrass': ['Cilantro', 'Basil', 'Marigold'],
    'Citronella': ['Lemongrass', 'Marigold', 'Basil'],
    'Pineapple': ['Legumes', 'Comfrey', 'Marigolds'],
    'Taro': ['Banana', 'Coconut', 'Sweet Potato'],
    'Cassava': ['Pigeon Pea', 'Sweet Potato', 'Maize'],
    'Sweet Potato': ['Corn', 'Sunflowers', 'Okra'],
    'Yam': ['Maize', 'Pigeon Pea', 'Pumpkin'],
    'Arrowroot': ['Taro', 'Banana', 'Ginger'],
    'Moringa': ['Lemongrass', 'Sweet Potato', 'Pigeon Pea'],
    'Neem': ['Lemongrass', 'Marigold', 'Turmeric'],
    'Bamboo': ['Ginger', 'Turmeric', 'Lemongrass'],
    'Pigeon Pea': ['Mango', 'Moringa', 'Cassava'],
    'Leucaena': ['Moringa', 'Pigeon Pea', 'Sweet Potato'],
    'Sesbania': ['Moringa', 'Leucaena', 'Tithonia'],
    'Tithonia': ['Maize', 'Beans', 'Tomatoes'],
    'Comfrey': ['Apple', 'Pear', 'Cherry'],
    'Yarrow': ['Apple', 'Pear', 'Cherry'],
    'Borage': ['Strawberry', 'Tomato', 'Squash'],
    'Nasturtium': ['Apple', 'Cucumber', 'Cabbage'],
    'Marigold': ['Tomato', 'Eggplant', 'Pepper'],
    'Chamomile': ['Cabbage', 'Onion', 'Cucumber'],
    'Lavender': ['Apple', 'Grape', 'Rose'],
    'Rosemary': ['Cabbage', 'Bean', 'Carrot'],
    'Thyme': ['Cabbage', 'Tomato', 'Eggplant'],
    'Sage': ['Cabbage', 'Carrot', 'Strawberry'],
    'Mint': ['Cabbage', 'Tomato', 'Pea'],
    'Lemon Balm': ['Tomato', 'Squash', 'Melon'],
    'Fennel': ['Dill', 'Coriander', 'Lovage'],
    'Dill': ['Cabbage', 'Onion', 'Cucumber'],
    'Coriander': ['Anise', 'Caraway', 'Potato'],
    'Anise': ['Coriander', 'Cilantro', 'Caraway'],
    'Caraway': ['Potato', 'Onion', 'Dill'],
    'Chives': ['Apple', 'Carrot', 'Tomato'],
    'Garlic': ['Apple', 'Pear', 'Peach'],
    'Onion': ['Carrot', 'Beet', 'Lettuce'],
    'Leek': ['Carrot', 'Celery', 'Apple'],
    'Asparagus': ['Tomato', 'Parsley', 'Basil'],
    'Rhubarb': ['Brassicas', 'Alliums', 'Strawberries'],
    'Artichoke': ['Sunflower', 'Tarragon', 'Borage'],
    'Horseradish': ['Potato', 'Apple', 'Blueberry']
};

function getCompanionSuggestions(selectedPlants) {
    const suggestions = new Set();
    selectedPlants.forEach(plant => {
        if (companionRelationships[plant]) {
            companionRelationships[plant].forEach(companion => {
                if (!selectedPlants.includes(companion)) {
                    suggestions.add(companion);
                }
            });
        }
    });
    return Array.from(suggestions);
}

function EconomicAnalysisTool({ gridState, plantDatabase, forestAge }) {
    const [setupCosts, setSetupCosts] = React.useState({
        landCost: 10000,
        soilPreparation: 2000,
        irrigation: 3000,
        initialPlants: 1000,
        tools: 500,
    });

    const [annualCosts, setAnnualCosts] = React.useState({
        maintenance: 1000,
        water: 500,
        additionalPlants: 200,
    });

    const [income, setIncome] = React.useState({});
    const [netProfit, setNetProfit] = React.useState(0);
    const [roi, setRoi] = React.useState(0);

    React.useEffect(() => {
        calculateIncome();
        calculateNetProfit();
    }, [gridState, forestAge, setupCosts, annualCosts]);

    const calculateIncome = () => {
        const newIncome = {};
        Object.values(gridState).flat().forEach(plant => {
            const dbPlant = plantDatabase.find(p => p.id === plant.id);
            if (dbPlant) {
                const maturityFactor = Math.min(1, forestAge / dbPlant.maturityAge);
                const annualYield = dbPlant.yieldPerYear * maturityFactor;
                const plantIncome = annualYield * dbPlant.marketPrice;
                newIncome[dbPlant.name] = (newIncome[dbPlant.name] || 0) + plantIncome;
            }
        });
        setIncome(newIncome);
    };

    const calculateNetProfit = () => {
        const totalIncome = Object.values(income).reduce((sum, val) => sum + val, 0);
        const totalSetupCosts = Object.values(setupCosts).reduce((sum, val) => sum + val, 0);
        const totalAnnualCosts = Object.values(annualCosts).reduce((sum, val) => sum + val, 0);
        const profit = totalIncome - totalAnnualCosts;
        const newNetProfit = profit * forestAge - totalSetupCosts;
        setNetProfit(newNetProfit);

        const totalCosts = totalSetupCosts + totalAnnualCosts * forestAge;
        const newRoi = totalCosts > 0 ? (newNetProfit / totalCosts) * 100 : 0;
        setRoi(newRoi);
    };

    const handleSetupCostChange = (key, value) => {
        setSetupCosts(prev => ({ ...prev, [key]: Number(value) }));
    };

    const handleAnnualCostChange = (key, value) => {
        setAnnualCosts(prev => ({ ...prev, [key]: Number(value) }));
    };

    return (
        <div className="economic-analysis-tool">
            <h2>Economic Analysis</h2>
            
            <div className="cost-inputs">
            <h3>Setup Costs</h3>
                {Object.entries(setupCosts).map(([key, value]) => (
                    <div key={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => handleSetupCostChange(key, e.target.value)}
                        />
                    </div>
                ))}

                <h3>Annual Costs</h3>
                {Object.entries(annualCosts).map(([key, value]) => (
                    <div key={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => handleAnnualCostChange(key, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="income-summary">
                <h3>Estimated Annual Income</h3>
                <ul>
                    {Object.entries(income).map(([plant, value]) => (
                        <li key={plant}>{plant}: ${value.toFixed(2)}</li>
                    ))}
                </ul>
                <p>Total Annual Income: ${Object.values(income).reduce((sum, val) => sum + val, 0).toFixed(2)}</p>
            </div>

            <div className="profit-summary">
                <h3>Profit Analysis (over {forestAge} years)</h3>
                <p>Net Profit: ${netProfit.toFixed(2)}</p>
                <p>Return on Investment (ROI): {roi.toFixed(2)}%</p>
            </div>
        </div>
    );
}

function FoodForestPlanner() {
    const [gridState, setGridState] = React.useState({});
    const [selectedPlant, setSelectedPlant] = React.useState(null);
    const [climate, setClimate] = React.useState('Tropical');
    const [forestAge, setForestAge] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedLayer, setSelectedLayer] = React.useState('All');
    const [score, setScore] = React.useState(0);
    const [profit, setProfit] = React.useState(0);
    const [biodiversityScore, setBiodiversityScore] = React.useState(0);
    const [yieldScore, setYieldScore] = React.useState(0);
    const [verticalScore, setVerticalScore] = React.useState(0);
    const [currentTool, setCurrentTool] = React.useState('plant');
    const [showModal, setShowModal] = React.useState(false);
    const [modalPlant, setModalPlant] = React.useState(null);
    const [propertySize, setPropertySize] = React.useState(1);
    const [gridSize, setGridSize] = React.useState(21);
    const canvasRef = React.useRef(null);
    const [sizeMode, setSizeMode] = React.useState('acre');
    const [customLength, setCustomLength] = React.useState(0);
    const [customWidth, setCustomWidth] = React.useState(0);
    const [companionSuggestions, setCompanionSuggestions] = React.useState([]);

    React.useEffect(() => {
        drawGrid();
        updateCompanionSuggestions();
    }, [gridState, gridSize]);

    React.useEffect(() => {
        updateGridSize();
    }, [propertySize, sizeMode, customLength, customWidth]);

    function updateGridSize() {
        let newGridSize;
        if (sizeMode === 'acre') {
            const squareFeet = propertySize * ACRE_TO_SQ_FT;
            newGridSize = Math.floor(Math.sqrt(squareFeet / CELL_AREA));
        } else {
            newGridSize = Math.floor(Math.min(customLength, customWidth) / 9);
        }
        newGridSize = Math.max(newGridSize, 1);
        setGridSize(newGridSize);
        setGridState({});
    }

    function drawGrid() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#ccc';
        for (let i = 0; i <= gridSize; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, gridSize * CELL_SIZE);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(gridSize * CELL_SIZE, i * CELL_SIZE);
            ctx.stroke();
        }

        Object.entries(gridState).forEach(([key, plants]) => {
            const [x, y] = key.split(',').map(Number);
            plants.forEach((plant, index) => {
                const { color, size } = getPlantRepresentation(plant);
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(
                    x * CELL_SIZE + CELL_SIZE / 2,
                    y * CELL_SIZE + CELL_SIZE / 2 + index * 5,
                    size,
                    0,
                    2 * Math.PI
                );
                ctx.fill();

                ctx.fillStyle = 'white';
                ctx.font = `${size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                    plant.symbol,
                    x * CELL_SIZE + CELL_SIZE / 2,
                    y * CELL_SIZE + CELL_SIZE / 2 + index * 5
                );
            });
        });
    }

    function updateCompanionSuggestions() {
        const selectedPlants = Object.values(gridState).flat().map(plant => plant.name);
        const suggestions = getCompanionSuggestions(selectedPlants);
        setCompanionSuggestions(suggestions);
    }

    function calculateScores() {
        const plants = Object.values(gridState).flat();
        
        const uniqueSpecies = new Set(plants.map(p => p.name)).size;
        const layersUsed = new Set(plants.map(p => p.layer)).size;
        const newBiodiversityScore = uniqueSpecies * 10 + (layersUsed === 7 ? 50 : 0);

        const totalYield = plants.reduce((sum, plant) => {
            const maturityFactor = Math.min(1, (forestAge / plant.maturityAge));
            return sum + (plant.yieldPerYear * maturityFactor);
        }, 0);
        const newYieldScore = Math.floor(totalYield);

        const layerCounts = plants.reduce((count, plant) => {
            count[plant.layer] = (count[plant.layer] || 0) + 1;
            return count;
        }, {});
        const newVerticalScore = Object.values(layerCounts).reduce((score, count) => score + Math.min(count, 5) * 10, 0);

        setBiodiversityScore(newBiodiversityScore);
        setYieldScore(newYieldScore);
        setVerticalScore(newVerticalScore);

        const newProfit = calculateProfit();
        setProfit(newProfit);

        return newBiodiversityScore + newYieldScore + newVerticalScore;
    }

    function calculateProfit() {
        const totalIncome = Object.values(gridState).flat().reduce((sum, plant) => {
            const maturityFactor = Math.min(1, (forestAge / plant.maturityAge));
            return sum + (plant.yieldPerYear * maturityFactor * plant.marketPrice);
        }, 0);

        const setupCost = 1000;
        const annualCost = 500;

        const totalCost = setupCost + (annualCost * forestAge);
        return totalIncome * forestAge - totalCost;
    }

    function showPlantInfo(plant) {
        setModalPlant(plant);
        setShowModal(true);
    }

    function handleCanvasClick(event) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / CELL_SIZE);
        const y = Math.floor((event.clientY - rect.top) / CELL_SIZE);
        const key = `${x},${y}`;

        if (currentTool === 'plant' && selectedPlant) {
            setGridState(prevState => {
                const currentPlants = prevState[key] || [];
                const layerCapacity = {
                    'Canopy': 1,
                    'Shrub': 4,
                    'Root': 7
                };
                const capacity = layerCapacity[selectedPlant.layer] || 7;
                
                if (currentPlants.filter(p => p.layer === selectedPlant.layer).length < capacity) {
                    return {
                        ...prevState,
                        [key]: [...currentPlants, selectedPlant]
                    };
                }
                return prevState;
            });
            updateCompanionSuggestions();
        } else if (currentTool === 'eraser') {
            setGridState(prevState => {
                const { [key]: _, ...newState } = prevState;
                return newState;
            });
            updateCompanionSuggestions();
        } else if (currentTool === 'info') {
            const plantsAtLocation = gridState[key] || [];
            if (plantsAtLocation.length > 0) {
                showPlantInfo(plantsAtLocation[plantsAtLocation.length - 1]);
            }
        }

        const newTotalScore = calculateScores();
        setScore(newTotalScore);
    }

    function calculateYield() {
        const yields = {};
        Object.values(gridState).flat().forEach(plant => {
            const plantYield = yields[plant.name] || { count: 0, yield: 0, unit: plant.unit };
            plantYield.count++;
            const maturityFactor = Math.min(1, (forestAge / plant.maturityAge));
            plantYield.yield += plant.yieldPerYear * maturityFactor;
            yields[plant.name] = plantYield;
        });
        return yields;
    }

    function generateSVG() {
        const svgWidth = gridSize * CELL_SIZE;
        const svgHeight = gridSize * CELL_SIZE;
        const tableWidth = 300;
        const tableHeight = 400;
        const legendHeight = 180;
    
        let svgContent = `<svg width="${svgWidth + tableWidth}" height="${Math.max(svgHeight, tableHeight) + legendHeight}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${svgWidth}" height="${svgHeight}" fill="#90EE90"/>`;
    
        // Draw grid lines
        for (let i = 0; i <= gridSize; i++) {
            svgContent += `<line x1="${i * CELL_SIZE}" y1="0" x2="${i * CELL_SIZE}" y2="${svgHeight}" stroke="#ccc" stroke-width="1"/>`;
            svgContent += `<line x1="0" y1="${i * CELL_SIZE}" x2="${svgWidth}" y2="${i * CELL_SIZE}" stroke="#ccc" stroke-width="1"/>`;
        }
    
        // Draw plants
        Object.entries(gridState).forEach(([key, plants]) => {
            const [x, y] = key.split(',').map(Number);
            plants.forEach((plant, index) => {
                const cx = x * CELL_SIZE + CELL_SIZE / 2;
                const cy = y * CELL_SIZE + CELL_SIZE / 2 + index * 5;
                const { color, size } = getPlantRepresentation(plant);
    
                svgContent += `<circle cx="${cx}" cy="${cy}" r="${size}" fill="${color}" opacity="0.7"/>`;
                
                const fontSize = size * 0.8;
                svgContent += `<text x="${cx}" y="${cy}" font-family="Arial" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central" fill="white">${plant.symbol}</text>`;
            });
        });
    
        // Add yield table
        svgContent += generateYieldTable(svgWidth, 0, tableWidth, tableHeight);
    
        // Add legend
        svgContent += generateLegend(0, Math.max(svgHeight, tableHeight));
    
        svgContent += '</svg>';
    
        return svgContent;
    }
    
    function generateYieldTable(x, y, width, height) {
        const yields = calculateYield();
        const rowHeight = 25;
        let tableContent = `
            <g transform="translate(${x}, ${y})">
            <rect x="0" y="0" width="${width}" height="${height}" fill="white" stroke="black"/>
            <text x="10" y="30" font-family="Arial" font-size="16" font-weight="bold">Estimated Yield (Year ${forestAge})</text>
            <line x1="0" y1="40" x2="${width}" y2="40" stroke="black" stroke-width="1"/>
            <text x="10" y="60" font-family="Arial" font-size="14" font-weight="bold">Plant</text>
            <text x="${width/2}" y="60" font-family="Arial" font-size="14" font-weight="bold">Count</text>
            <text x="${width-10}" y="60" font-family="Arial" font-size="14" font-weight="bold" text-anchor="end">Yield</text>
            <line x1="0" y1="70" x2="${width}" y2="70" stroke="black" stroke-width="1"/>
        `;
    
        Object.entries(yields).forEach(([plantName, data], index) => {
            const y = 90 + index * rowHeight;
            const plant = plantDatabase.find(p => p.name === plantName);
            tableContent += `
                <text x="10" y="${y}" font-family="Arial" font-size="12">${plant.symbol} ${plantName}</text>
                <text x="${width/2}" y="${y}" font-family="Arial" font-size="12">${data.count}</text>
                <text x="${width-10}" y="${y}" font-family="Arial" font-size="12" text-anchor="end">${data.yield.toFixed(2)} ${data.unit}</text>
            `;
        });
    
        tableContent += '</g>';
        return tableContent;
    }
    
    function generateLegend(x, y) {
        const legendItems = Object.entries({
            'Canopy': { color: '#228B22' },
            'Sub-canopy': { color: '#32CD32' },
            'Shrub': { color: '#90EE90' },
            'Herbaceous': { color: '#98FB98' },
            'Ground Cover': { color: '#00FA9A' },
            'Vine': { color: '#3CB371' },
            'Root': { color: '#964B00' }
        });
        let legend = `<g transform="translate(${x + 10}, ${y + 10})">`;
        legend += '<rect x="0" y="0" width="180" height="180" fill="white" opacity="0.8"/>';
        legend += '<text x="5" y="20" font-family="Arial" font-size="14" font-weight="bold">Legend:</text>';
        
        legendItems.forEach(([layer, config], index) => {
            const y = 40 + index * 20;
            legend += `<circle cx="15" cy="${y}" r="7" fill="${config.color}"/>`;
            legend += `<text x="30" y="${y + 5}" font-family="Arial" font-size="12">${layer}</text>`;
        });
    
        legend += '</g>';
        return legend;
    }
    
    function exportSVG() {
        const svgContent = generateSVG();
        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'food-forest-layout.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    function exportJPG() {
        const svgContent = generateSVG();
        const svg = new Blob([svgContent], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svg);
    
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const svgWidth = gridSize * CELL_SIZE + 300; // Add 300 for the yield table
            const svgHeight = Math.max(gridSize * CELL_SIZE, 400) + 180; // Add 180 for the legend
            canvas.width = svgWidth;
            canvas.height = svgHeight;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
    
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'food-forest-layout.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 'image/jpeg', 0.95);
        };
        img.src = url;
    }

    const filteredPlants = plantDatabase
        .filter(plant => plant.climate === climate)
        .filter(plant => plant.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(plant => selectedLayer === 'All' || plant.layer === selectedLayer);

    return (
        <div className="container">
            <h1>Food Forest Planner</h1>

            <div className="tool-selection">
                <button onClick={() => setCurrentTool('plant')} className={currentTool === 'plant' ? 'active' : ''}>Plant</button>
                <button onClick={() => setCurrentTool('eraser')} className={currentTool === 'eraser' ? 'active' : ''}>Eraser</button>
                <button onClick={() => setCurrentTool('info')} className={currentTool === 'info' ? 'active' : ''}>Info</button>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search for plants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <select value={climate} onChange={(e) => setClimate(e.target.value)}>
                <option value="Tropical">Tropical</option>
                <option value="Temperate">Temperate</option>
                <option value="Subtropical">Subtropical</option>
            </select>

            <select value={selectedLayer} onChange={(e) => setSelectedLayer(e.target.value)}>
                <option value="All">All Layers</option>
                <option value="Canopy">Canopy</option>
                <option value="Sub-canopy">Sub-canopy</option>
                <option value="Shrub">Shrub</option>
                <option value="Herbaceous">Herbaceous</option>
                <option value="Ground Cover">Ground Cover</option>
                <option value="Vine">Vine</option>
                <option value="Root">Root</option>
            </select>

            <div className="grid">
                <div className="plant-selection">
                    {filteredPlants.map(plant => (
                        <button
                            key={plant.id}
                            className={selectedPlant && selectedPlant.id === plant.id ? 'selected' : ''}
                            onClick={() => setSelectedPlant(plant)}
                        >
                            {plant.name} ({plant.layer})
                        </button>
                    ))}
                </div>
                <canvas
                    ref={canvasRef}
                    width={gridSize * CELL_SIZE}
                    height={gridSize * CELL_SIZE}
                    onClick={handleCanvasClick}
                    style={{ border: '1px solid black' }}
                />
            </div>

            <div id="companion-suggestions" className="companion-suggestions">
                <h3>Companion Plant Suggestions:</h3>
                {companionSuggestions.map((plant, index) => (
                    <span key={index} className="companion-suggestion" onClick={() => setSelectedPlant(plantDatabase.find(p => p.name === plant))}>
                        {plant}
                    </span>
                ))}
            </div>

            <div className="slider-container">
                <label htmlFor="forest-age">Forest Age: {forestAge} years</label>
                <input
                    id="forest-age"
                    type="range"
                    min="1"
                    max="50"
                    value={forestAge}
                    onChange={(e) => setForestAge(Number(e.target.value))}
                    className="slider"
                />
            </div>

            <div className="property-size-container">
                <label htmlFor="size-mode">Size Mode:</label>
                <select id="size-mode" value={sizeMode} onChange={(e) => setSizeMode(e.target.value)}>
                    <option value="acre">Acre</option>
                    <option value="custom">Custom</option>
                </select>
                {sizeMode === 'acre' && (
                    <div>
                        <label htmlFor="property-size">Property Size (in acres):</label>
                        <input
                            id="property-size"
                            type="number"
                            value={propertySize}
                            onChange={(e) => setPropertySize(Number(e.target.value))}
                            min="0.1"
                            step="0.1"
                        />
                    </div>
                )}
                {sizeMode === 'custom' && (
                    <div>
                        <label htmlFor="custom-length">Length (in feet):</label>
                        <input
                            id="custom-length"
                            type="number"
                            value={customLength}
                            onChange={(e) => setCustomLength(Number(e.target.value))}
                            min="9"
                            step="9"
                        />
                        <label htmlFor="custom-width">Width (in feet):</label>
                        <input
                            id="custom-width"
                            type="number"
                            value={customWidth}
                            onChange={(e) => setCustomWidth(Number(e.target.value))}
                            min="9"
                            step="9"
                        />
                    </div>
                )}
            </div>

            <div className="yield-table-container">
                <table className="yield-table">
                    <thead>
                        <tr>
                            <th>Plant</th>
                            <th>Count</th>
                            <th>Yield</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(calculateYield()).map(([plantName, data]) => (
                            <tr key={plantName}>
                                <td>{plantName}</td>
                                <td>{data.count}</td>
                                <td>{data.yield.toFixed(2)}</td>
                                <td>{data.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EconomicAnalysisTool
                gridState={gridState}
                plantDatabase={plantDatabase}
                forestAge={forestAge}
            />

            <div className="export-buttons">
                <button onClick={exportSVG}>Export as SVG</button>
                <button onClick={exportJPG}>Export as JPG</button>
            </div>

            {showModal && modalPlant && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <div className="plant-info">
                            <img src={modalPlant.image} alt={modalPlant.name} />
                            <div className="plant-details">
                                <h2>{modalPlant.name}</h2>
                                <p>{modalPlant.description}</p>
                                <ul>
                                    <li><strong>Climate:</strong> {modalPlant.climate}</li>
                                    <li><strong>Layer:</strong> {modalPlant.layer}</li>
                                    <li><strong>Yield per Year:</strong> {modalPlant.yieldPerYear} {modalPlant.unit}</li>
                                    <li><strong>Market Price:</strong> ${modalPlant.marketPrice} per {modalPlant.unit}</li>
                                    <li><strong>Maturity Age:</strong> {modalPlant.maturityAge} years</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<FoodForestPlanner />, document.getElementById('root'));