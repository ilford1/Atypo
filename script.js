class BiometricFontGenerator {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.generateFont(); // Initial generation
    }

    init() {
        this.textInput = document.getElementById('textInput');
        this.fontSelect = document.getElementById('fontSelect');
        this.biometricToggle = document.getElementById('biometricToggle');
        this.scaleSlider = document.getElementById('scaleSlider');
        this.scaleValue = document.getElementById('scaleValue');
        this.colorPicker = document.getElementById('colorPicker');
        this.outputSvg = document.getElementById('outputSvg');
        this.decodingGuide = document.getElementById('decodingGuide');
        this.copyBtn = document.getElementById('copyBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        
        // Vitkovac-specific controls
        this.formSelect = document.getElementById('formSelect');
        this.weightSelect = document.getElementById('weightSelect');
        this.indexStyleSelect = document.getElementById('indexStyleSelect');
        this.mainLineColorPicker = document.getElementById('mainLineColorPicker');
        this.alterationColorPicker = document.getElementById('alterationColorPicker');
        this.colorExperimentToggle = document.getElementById('colorExperimentToggle');
    }

    setupEventListeners() {
        this.textInput.addEventListener('input', () => this.generateFont());
        this.fontSelect.addEventListener('change', () => {
            this.updateControlVisibility();
            this.generateFont();
        });
        this.biometricToggle.addEventListener('change', () => this.generateFont());
        this.scaleSlider.addEventListener('input', () => {
            this.scaleValue.textContent = this.scaleSlider.value;
            this.generateFont();
        });
        this.colorPicker.addEventListener('change', () => this.generateFont());
        this.formSelect.addEventListener('change', () => this.generateFont());
        this.weightSelect.addEventListener('change', () => this.generateFont());
        this.indexStyleSelect.addEventListener('change', () => this.generateFont());
        this.mainLineColorPicker.addEventListener('change', () => this.generateFont());
        this.alterationColorPicker.addEventListener('change', () => this.generateFont());
        this.colorExperimentToggle.addEventListener('change', () => this.generateFont());
        
        // Initialize control visibility
        this.updateControlVisibility();
        this.copyBtn.addEventListener('click', () => this.copySvg());
        this.downloadBtn.addEventListener('click', () => this.downloadSvg());
    }

    updateControlVisibility() {
        const selectedFont = this.fontSelect.value;
        const vitkovacControls = document.getElementById('vitkovacControls');
        
        // Show/hide Vitkovac controls
        if (selectedFont.startsWith('vitkovac')) {
            vitkovacControls.classList.add('show');
        } else {
            vitkovacControls.classList.remove('show');
        }
        
        // Future: Add more font-specific control sections here
        // e.g., kvar-controls, epetri-controls, etc.
    }

    // Character patterns based on the Atypography document
    getCharacterPatterns() {
        return {
            'kvar-h-brut': {
                'a': [[1,1,1,1], [1,0,0,1], [1,1,1,1], [1,0,0,1], [1,0,0,1]],
                'b': [[1,1,1,0], [1,0,0,1], [1,1,1,0], [1,0,0,1], [1,1,1,0]],
                'c': [[0,1,1,1], [1,0,0,0], [1,0,0,0], [1,0,0,0], [0,1,1,1]],
                'd': [[1,1,1,0], [1,0,0,1], [1,0,0,1], [1,0,0,1], [1,1,1,0]],
                'e': [[1,1,1,1], [1,0,0,0], [1,1,1,0], [1,0,0,0], [1,1,1,1]],
                'f': [[1,1,1,1], [1,0,0,0], [1,1,1,0], [1,0,0,0], [1,0,0,0]],
                'g': [[0,1,1,1], [1,0,0,0], [1,0,1,1], [1,0,0,1], [0,1,1,1]],
                'h': [[1,0,0,1], [1,0,0,1], [1,1,1,1], [1,0,0,1], [1,0,0,1]],
                'i': [[1,1,1], [0,1,0], [0,1,0], [0,1,0], [1,1,1]],
                'j': [[0,0,1], [0,0,1], [0,0,1], [1,0,1], [0,1,0]],
                'k': [[1,0,0,1], [1,0,1,0], [1,1,0,0], [1,0,1,0], [1,0,0,1]],
                'l': [[1,0,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0], [1,1,1,1]],
                'm': [[1,0,0,1], [1,1,1,1], [1,0,0,1], [1,0,0,1], [1,0,0,1]],
                'n': [[1,0,0,1], [1,1,0,1], [1,0,1,1], [1,0,0,1], [1,0,0,1]],
                'o': [[0,1,1,0], [1,0,0,1], [1,0,0,1], [1,0,0,1], [0,1,1,0]],
                'p': [[1,1,1,0], [1,0,0,1], [1,1,1,0], [1,0,0,0], [1,0,0,0]],
                'q': [[0,1,1,0], [1,0,0,1], [1,0,1,1], [0,1,1,0], [0,0,0,1]],
                'r': [[1,1,1,0], [1,0,0,1], [1,1,1,0], [1,0,1,0], [1,0,0,1]],
                's': [[0,1,1,1], [1,0,0,0], [0,1,1,0], [0,0,0,1], [1,1,1,0]],
                't': [[1,1,1], [0,1,0], [0,1,0], [0,1,0], [0,1,0]],
                'u': [[1,0,0,1], [1,0,0,1], [1,0,0,1], [1,0,0,1], [0,1,1,0]],
                'v': [[1,0,0,1], [1,0,0,1], [1,0,0,1], [0,1,1,0], [0,1,0,0]],
                'w': [[1,0,0,1], [1,0,0,1], [1,0,0,1], [1,1,1,1], [1,0,0,1]],
                'x': [[1,0,0,1], [0,1,1,0], [0,1,1,0], [0,1,1,0], [1,0,0,1]],
                'y': [[1,0,0,1], [0,1,1,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]],
                'z': [[1,1,1,1], [0,0,1,0], [0,1,0,0], [1,0,0,0], [1,1,1,1]],
                ' ': [[0,0], [0,0], [0,0], [0,0], [0,0]]
            },
            'kvar-h-tite': {
                'a': [[1,1,1,1], [0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
                'b': [[1,1,1], [0,0,0], [1,1,1], [0,0,0], [1,1,1]],
                'c': [[1,1,1,1], [0,0,0,0], [0,0,0,0], [0,0,0,0], [1,1,1,1]],
                'd': [[1,1,1], [0,0,0], [0,0,0], [0,0,0], [1,1,1]],
                'e': [[1,1,1,1], [0,0,0,0], [1,1,1], [0,0,0,0], [1,1,1,1]],
                'f': [[1,1,1,1], [0,0,0,0], [1,1,1], [0,0,0,0], [0,0,0,0]],
                'g': [[1,1,1,1], [0,0,0,0], [0,0,1,1], [0,0,0,0], [1,1,1,1]],
                'h': [[0,0,0,0], [0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
                'i': [[1,1,1], [0,0,0], [0,0,0], [0,0,0], [1,1,1]],
                'j': [[0,0,1], [0,0,0], [0,0,0], [0,0,0], [1,1,0]],
                'k': [[0,0,0,0], [0,1,0,0], [1,0,0,0], [0,1,0,0], [0,0,0,0]],
                'l': [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [1,1,1,1]],
                'm': [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0], [0,0,0,0]],
                'n': [[0,0,0,0], [1,0,0,0], [0,1,1,0], [0,0,0,1], [0,0,0,0]],
                'o': [[1,1,1,0], [0,0,0,1], [0,0,0,1], [0,0,0,1], [1,1,1,0]],
                'p': [[1,1,1], [0,0,0], [1,1,1], [0,0,0], [0,0,0]],
                'q': [[1,1,1,0], [0,0,0,1], [0,1,1,1], [1,1,1,0], [0,0,0,1]],
                'r': [[1,1,1], [0,0,0], [1,1,1], [0,1,0], [0,0,1]],
                's': [[1,1,1,1], [0,0,0,0], [1,1,1,1], [0,0,0,0], [1,1,1,1]],
                't': [[1,1,1], [0,0,0], [0,0,0], [0,0,0], [0,0,0]],
                'u': [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [1,1,1,0]],
                'v': [[0,0,0,0], [0,0,0,0], [0,0,0,0], [1,1,0,0], [0,1,0,0]],
                'w': [[0,0,0,0], [0,0,0,0], [0,0,0,0], [1,1,1,1], [0,0,0,0]],
                'x': [[0,0,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [0,0,0,0]],
                'y': [[0,0,0,0], [1,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]],
                'z': [[1,1,1,1], [0,1,0,0], [1,0,0,0], [0,0,1,0], [1,1,1,1]],
                ' ': [[0,0], [0,0], [0,0], [0,0], [0,0]]
            }
        };
    }

    getVerticalPatterns() {
        return {
            'a': [1,1,1,1,1],
            'b': [1,1,1,1,1],
            'c': [1,1,0,1,1],
            'd': [1,1,1,1,1],
            'e': [1,1,0,1,1],
            'f': [1,1,0,1,0],
            'g': [1,1,0,1,1],
            'h': [1,0,1,0,1],
            'i': [1],
            'j': [1],
            'k': [1,0,1,0,1],
            'l': [1],
            'm': [1,1,0,1,1],
            'n': [1,1,0,1,1],
            'o': [1,1,0,1,1],
            'p': [1,1,1,0,0],
            'q': [1,1,0,1,1],
            'r': [1,1,1,1,1],
            's': [1,1,1,1,1],
            't': [1],
            'u': [1,0,0,0,1],
            'v': [1,0,0,0,1],
            'w': [1,1,0,1,1],
            'x': [1,1,1,1,1],
            'y': [1,0,1,0,1],
            'z': [1,1,1,1,1],
            ' ': [0]
        };
    }

    getSquarePatterns() {
        return {
            'a': [[1,1],[1,1]],
            'b': [[1,1],[1,0]],
            'c': [[1,1],[1,0]],
            'd': [[1,1],[0,1]],
            'e': [[1,1],[1,0]],
            'f': [[1,1],[1,0]],
            'g': [[1,1],[0,1]],
            'h': [[1,0],[1,1]],
            'i': [[1]],
            'j': [[1]],
            'k': [[1,0],[1,1]],
            'l': [[1],[1]],
            'm': [[1,1],[1,1]],
            'n': [[1,0],[1,1]],
            'o': [[1,1],[1,1]],
            'p': [[1,1],[1,0]],
            'q': [[1,1],[0,1]],
            'r': [[1,1],[1,0]],
            's': [[1,1],[0,1]],
            't': [[1]],
            'u': [[1,0],[1,1]],
            'v': [[1,0],[1,1]],
            'w': [[1,1],[1,1]],
            'x': [[1,1],[1,1]],
            'y': [[1,0],[0,1]],
            'z': [[1,1],[1,1]],
            ' ': [[0]]
        };
    }

    getEpetriPatterns() {
        // Based on the character set from Atypography document page 54
        // Epetri is a readable waveform with vertical lines of varying heights
        return {
            'a': [1,1,1,1],     // A
            'b': [1,2,1],       // B  
            'c': [0,1,1,1],     // C
            'd': [1,1,1,0],     // D
            'e': [1,1,1,0],     // E
            'f': [1,1,2],       // F
            'g': [1,2,0],       // G
            'h': [1,1,1,1],     // H
            'i': [1,1,1],       // I
            'j': [0,1,1],       // J
            'k': [1,2,1,0],     // K
            'l': [1,1,0,0],     // L
            'm': [1,1,1,1,1],   // M
            'n': [1,1,1,1],     // N
            'o': [1,1,1,1],     // O
            'p': [1,1,1,1],     // P
            'q': [1,1,1,1],     // Q
            'r': [1,2,2,1],     // R
            's': [0,1,1,2],     // S
            't': [2,1,1,2],     // T
            'u': [1,1,1,1],     // U
            'v': [1,1,1,1],     // V
            'w': [1,1,1,1],     // W
            'x': [0,1,2],       // X
            'y': [1,1,1,1],     // Y
            'z': [2,1,1,0],     // Z
            ' ': [0]            // Space
        };
    }

    getMidisHPatterns() {
        // Based on Midis H character set from page 64
        // Using horizontal rectangles with diagonal movement rules
        return {
            'a': [[1,0,1],[0,1,0]],
            'b': [[1,1,1]],
            'c': [[1,1,0]],
            'd': [[0,1,1]],
            'e': [[1,1,0]],
            'f': [[1,1,1]],
            'g': [[1,0,1]],
            'h': [[1,1,0],[1,0,0]],
            'i': [[1,1,1]],
            'j': [[0,1,0]],
            'k': [[1,0,1]],
            'l': [[1,0,0]],
            'm': [[0,1,1],[1,0,1]],
            'n': [[0,1,1],[1,0,1]],
            'o': [[1,1,0]],
            'p': [[1,1,1],[0,1,0]],
            'q': [[1,1,0],[1,1,1]],
            'r': [[1,1,1],[0,1,0]],
            's': [[0,1,1]],
            't': [[1,0,1]],
            'u': [[1,1,0]],
            'v': [[1,0,1]],
            'w': [[1,0,1],[1,0,1]],
            'x': [[1,1,0]],
            'y': [[1,0,1]],
            'z': [[1,0,0]],
            ' ': [[0]]
        };
    }

    getMidisVPatterns() {
        // Based on Midis V character set from page 71
        // Vertical patterns with varying heights
        return {
            'a': [1,0],
            'b': [1,0],
            'c': [1,0],
            'd': [1,0],
            'e': [1,0],
            'f': [1,0],
            'g': [1,0],
            'h': [1,0],
            'i': [1],
            'j': [0,1],
            'k': [1,0],
            'l': [1,0],
            'm': [1,1,1],
            'n': [1,1,1],
            'o': [1,1,1],
            'p': [1,1],
            'q': [1,1,1],
            'r': [1],
            's': [0,1,2],
            't': [2,1,1],
            'u': [1,0],
            'v': [1,1,1,1],
            'w': [1,1,1],
            'x': [1,1],
            'y': [1,2],
            'z': [1,1,0],
            ' ': [0]
        };
    }

    getRicettaPatterns() {
        // Based on Ricetta character set from page 73
        // Extremely stretched horizontal lines
        return {
            'a': [[1,1,1,1,1,1]],
            'b': [[1,1,1],[1,1,1,1]],
            'c': [[1,1,1,1,1,1,1,1]],
            'd': [[1,1,1,1,1,1,1]],
            'e': [[1,1,1,1,1,1]],
            'f': [[1,1,1,1,1,1]],
            'g': [[1,1,1,1,1,1,1,1]],
            'h': [[1,1,1,1,1,1]],
            'i': [[1,1,1]],
            'j': [[1,1,1,1,1,1]],
            'k': [[1,1,1,1,1,1]],
            'l': [[1]],
            'm': [[1,1,1,1,1,1]],
            'n': [[1,1,1,1,1,1]],
            'o': [[1,1,1,1,1,1,1,1]],
            'p': [[1,1,1,1,1,1,1,1]],
            'q': [[1,1,1,1,1,1,1]],
            'r': [[1,1,1,1,1,1]],
            's': [[1,1,1,1,1]],
            't': [[1,1,1,1,1,1]],
            'u': [[1,1,1,1,1]],
            'v': [[1,1,1,1,1,1]],
            'w': [[1,1,1,1,1,1]],
            'x': [[1,1,1,1,1,1]],
            'y': [[1,1,1,1,1,1]],
                'z': [[1,1,1,1,1]],
                ' ': [[0]]
            };
        };

    getVitkovacHPatterns() {
        // Based on Vitkovac H character set from Atypography3.pdf
        // All glyphs except I/i have uniform width (4 units). I/i is narrower but taller/deeper.
        // Format: { width, up: [positions], down: [positions], carveMain: boolean }
        const STANDARD_WIDTH = 4;
        const I_WIDTH = 1;  // I/i is narrower
        
        return {
            'a': { width: STANDARD_WIDTH, up: [1], down: [1], carveMain: false },
            'b': { width: STANDARD_WIDTH, up: [0,2], down: [0,2], carveMain: false },
            'c': { width: STANDARD_WIDTH, up: [0], down: [3], carveMain: false },
            'd': { width: STANDARD_WIDTH, up: [3], down: [0], carveMain: false },
            'e': { width: STANDARD_WIDTH, up: [0,3], down: [], carveMain: false },
            'f': { width: STANDARD_WIDTH, up: [0], down: [], carveMain: false },
            'g': { width: STANDARD_WIDTH, up: [0], down: [3], carveMain: false },
            'h': { width: STANDARD_WIDTH, up: [0,3], down: [], carveMain: false },
            'i': { width: I_WIDTH, up: [0], down: [0], carveMain: false },
            'j': { width: STANDARD_WIDTH, up: [], down: [2], carveMain: false },
            'k': { width: STANDARD_WIDTH, up: [0], down: [0,2], carveMain: false },
            'l': { width: STANDARD_WIDTH, up: [0], down: [], carveMain: false },
            'm': { width: STANDARD_WIDTH, up: [0,1,2,3], down: [], carveMain: false },
            'n': { width: STANDARD_WIDTH, up: [0,3], down: [], carveMain: false },
            'o': { width: STANDARD_WIDTH, up: [0,3], down: [0,3], carveMain: false },
            'p': { width: STANDARD_WIDTH, up: [0,2], down: [0], carveMain: false },
            'q': { width: STANDARD_WIDTH, up: [0,3], down: [3], carveMain: false },
            'r': { width: STANDARD_WIDTH, up: [0,2], down: [0], carveMain: false },
            's': { width: STANDARD_WIDTH, up: [3], down: [0], carveMain: true },  // S requires main line carving
            't': { width: STANDARD_WIDTH, up: [1], down: [], carveMain: false },
            'u': { width: STANDARD_WIDTH, up: [], down: [0,3], carveMain: false },
            'v': { width: STANDARD_WIDTH, up: [0], down: [3], carveMain: false },
            'w': { width: STANDARD_WIDTH, up: [0,1,2,3], down: [], carveMain: false },
            'x': { width: STANDARD_WIDTH, up: [0,3], down: [0,3], carveMain: false },
            'y': { width: STANDARD_WIDTH, up: [0], down: [0,3], carveMain: false },
            'z': { width: STANDARD_WIDTH, up: [0], down: [3], carveMain: true },  // Z requires main line carving
            ' ': { width: STANDARD_WIDTH, up: [], down: [], carveMain: false },
            
            // Numerals (0-9) based on document patterns
            '0': { width: STANDARD_WIDTH, up: [0,3], down: [0,3], carveMain: false },
            '1': { width: I_WIDTH, up: [0], down: [0], carveMain: false },  // Like I, narrow but taller
            '2': { width: STANDARD_WIDTH, up: [0,3], down: [0], carveMain: false },
            '3': { width: STANDARD_WIDTH, up: [3], down: [3], carveMain: false },
            '4': { width: STANDARD_WIDTH, up: [0], down: [2], carveMain: false },
            '5': { width: STANDARD_WIDTH, up: [0], down: [3], carveMain: false },
            '6': { width: STANDARD_WIDTH, up: [0], down: [0,3], carveMain: false },
            '7': { width: STANDARD_WIDTH, up: [0,3], down: [], carveMain: false },
            '8': { width: STANDARD_WIDTH, up: [0,3], down: [0,3], carveMain: false },
            '9': { width: STANDARD_WIDTH, up: [0,3], down: [3], carveMain: false },
            
            // Alternate glyphs (uppercase variants) - different heights and positions for auto-leveling
            'A': { width: STANDARD_WIDTH, up: [1,2], down: [1], carveMain: false, mainLineOffset: 0 },
            'B': { width: STANDARD_WIDTH, up: [0,2,3], down: [0,2], carveMain: false, mainLineOffset: -0.5 },
            'C': { width: STANDARD_WIDTH, up: [0,1], down: [2,3], carveMain: false, mainLineOffset: 0.5 },
            'D': { width: STANDARD_WIDTH, up: [3], down: [0,1], carveMain: false, mainLineOffset: 0 },
            'E': { width: STANDARD_WIDTH, up: [0,2,3], down: [1], carveMain: false, mainLineOffset: -0.3 },
            'F': { width: STANDARD_WIDTH, up: [0,1], down: [], carveMain: false, mainLineOffset: 0.3 },
            'G': { width: STANDARD_WIDTH, up: [0,1], down: [2,3], carveMain: false, mainLineOffset: 0 },
            'H': { width: STANDARD_WIDTH, up: [0,3], down: [1], carveMain: false, mainLineOffset: -0.2 },
            'I': { width: I_WIDTH, up: [0], down: [0], carveMain: false, mainLineOffset: 0 },
            'J': { width: STANDARD_WIDTH, up: [1], down: [1,2], carveMain: false, mainLineOffset: 0.4 },
            'K': { width: STANDARD_WIDTH, up: [0,1], down: [0,1,2], carveMain: false, mainLineOffset: 0 },
            'L': { width: STANDARD_WIDTH, up: [0,1], down: [2], carveMain: false, mainLineOffset: 0.2 },
            'M': { width: STANDARD_WIDTH, up: [0,1,2,3], down: [1], carveMain: false, mainLineOffset: 0 },
            'N': { width: STANDARD_WIDTH, up: [0,2,3], down: [1], carveMain: false, mainLineOffset: 0 },
            'O': { width: STANDARD_WIDTH, up: [0,2,3], down: [0,1,3], carveMain: false, mainLineOffset: 0 },
            'P': { width: STANDARD_WIDTH, up: [0,1,2], down: [0,1], carveMain: false, mainLineOffset: 0 },
            'Q': { width: STANDARD_WIDTH, up: [0,2,3], down: [1,3], carveMain: false, mainLineOffset: 0 },
            'R': { width: STANDARD_WIDTH, up: [0,1,2], down: [0,1], carveMain: false, mainLineOffset: 0 },
            'S': { width: STANDARD_WIDTH, up: [2,3], down: [0,1], carveMain: true, mainLineOffset: 0 },
            'T': { width: STANDARD_WIDTH, up: [0,1,2,3], down: [], carveMain: false, mainLineOffset: 0.5 },
            'U': { width: STANDARD_WIDTH, up: [1], down: [0,2,3], carveMain: false, mainLineOffset: 0 },
            'V': { width: STANDARD_WIDTH, up: [0,1], down: [2,3], carveMain: false, mainLineOffset: 0 },
            'W': { width: STANDARD_WIDTH, up: [0,1,2,3], down: [2], carveMain: false, mainLineOffset: 0 },
            'X': { width: STANDARD_WIDTH, up: [0,1,3], down: [0,2,3], carveMain: false, mainLineOffset: 0 },
            'Y': { width: STANDARD_WIDTH, up: [0,1], down: [0,1,3], carveMain: false, mainLineOffset: 0 },
            'Z': { width: STANDARD_WIDTH, up: [0,1], down: [2,3], carveMain: true, mainLineOffset: 0 }
        };
    }

    getVitkovacVPatterns() {
        // Based on Vitkovac V character set from Atypography3.pdf  
        // Main vertical line with horizontal alteration lines left/right
        // Format: [height, [left_lines], [right_lines]]
        return {
            'a': { height: 5, left: [0,2,4], right: [] },
            'b': { height: 5, left: [0,2], right: [0,2,4] },
            'c': { height: 5, left: [0,4], right: [] },
            'd': { height: 5, left: [], right: [0,4] },
            'e': { height: 5, left: [0,2,4], right: [] },
            'f': { height: 5, left: [0,2], right: [] },
            'g': { height: 5, left: [0,4], right: [2] },
            'h': { height: 5, left: [0,4], right: [2] },
            'i': { height: 3, left: [1], right: [1] },
            'j': { height: 4, left: [], right: [0] },
            'k': { height: 5, left: [1,3], right: [0,4] },
            'l': { height: 4, left: [3], right: [] },
            'm': { height: 5, left: [0,4], right: [0,4] },
            'n': { height: 5, left: [0,4], right: [0,4] },
            'o': { height: 5, left: [0,4], right: [0,4] },
            'p': { height: 5, left: [0,2], right: [0,2] },
            'q': { height: 6, left: [0,4], right: [0,4,5] },
            'r': { height: 5, left: [0,2], right: [0] },
            's': { height: 5, left: [0,2,4], right: [] },
            't': { height: 5, left: [1], right: [1] },
            'u': { height: 5, left: [4], right: [4] },
            'v': { height: 5, left: [0], right: [4] },
            'w': { height: 5, left: [0,2,4], right: [4] },
            'x': { height: 5, left: [0,4], right: [0,4] },
            'y': { height: 6, left: [0], right: [4,5] },
            'z': { height: 5, left: [0,4], right: [] },
            ' ': { height: 2, left: [], right: [] },
            
            // Numerals (0-9) for vertical composition
            '0': { height: 5, left: [0,4], right: [0,4] },
            '1': { height: 3, left: [1], right: [1] },  // Like I, but shorter
            '2': { height: 5, left: [0,2,4], right: [0,2] },
            '3': { height: 5, left: [], right: [0,2,4] },
            '4': { height: 5, left: [0,2], right: [2,4] },
            '5': { height: 5, left: [0,2,4], right: [2,4] },
            '6': { height: 5, left: [0,2,4], right: [4] },
            '7': { height: 5, left: [0], right: [0,4] },
            '8': { height: 5, left: [0,2,4], right: [0,2,4] },
            '9': { height: 5, left: [0,2], right: [0,2,4] },
            
            // Alternate glyphs (uppercase variants) - different patterns for variety
            'A': { height: 5, left: [0,1,2,4], right: [2], mainLineXOffset: 0 },
            'B': { height: 5, left: [0,2], right: [0,2,3,4], mainLineXOffset: -0.3 },
            'C': { height: 5, left: [0,3,4], right: [1], mainLineXOffset: 0.2 },
            'D': { height: 5, left: [1], right: [0,3,4], mainLineXOffset: 0 },
            'E': { height: 5, left: [0,1,2,3,4], right: [2], mainLineXOffset: -0.2 },
            'F': { height: 5, left: [0,1,2], right: [0], mainLineXOffset: 0.3 },
            'G': { height: 5, left: [0,3,4], right: [2,3], mainLineXOffset: 0 },
            'H': { height: 5, left: [0,3,4], right: [1,2], mainLineXOffset: 0 },
            'I': { height: 3, left: [0,2], right: [0,2], mainLineXOffset: 0 },
            'J': { height: 6, left: [2], right: [0,4,5], mainLineXOffset: 0 },
            'K': { height: 5, left: [0,1,3], right: [0,2,4], mainLineXOffset: 0 },
            'L': { height: 4, left: [2,3], right: [3], mainLineXOffset: 0 },
            'M': { height: 5, left: [0,3,4], right: [0,3,4], mainLineXOffset: 0 },
            'N': { height: 5, left: [0,3,4], right: [0,1,4], mainLineXOffset: 0 },
            'O': { height: 5, left: [0,2,4], right: [0,2,4], mainLineXOffset: 0 },
            'P': { height: 5, left: [0,1,2], right: [0,1,2], mainLineXOffset: 0 },
            'Q': { height: 6, left: [0,2,4], right: [0,2,4,5], mainLineXOffset: 0 },
            'R': { height: 5, left: [0,1,2], right: [0,3], mainLineXOffset: 0 },
            'S': { height: 5, left: [0,1,2,3,4], right: [2], mainLineXOffset: 0 },
            'T': { height: 5, left: [0], right: [0], mainLineXOffset: 0 },
            'U': { height: 5, left: [3,4], right: [3,4], mainLineXOffset: 0 },
            'V': { height: 5, left: [0,1], right: [3,4], mainLineXOffset: 0 },
            'W': { height: 5, left: [0,1,2,3,4], right: [3,4], mainLineXOffset: 0 },
            'X': { height: 5, left: [0,2,4], right: [0,2,4], mainLineXOffset: 0 },
            'Y': { height: 6, left: [0,1], right: [3,4,5], mainLineXOffset: 0 },
            'Z': { height: 5, left: [0,2,4], right: [1], mainLineXOffset: 0 }
        };
    }

    generateKvarH(text, style = 'brut') {
        const patterns = this.getCharacterPatterns()[`kvar-h-${style}`] || this.getCharacterPatterns()['kvar-h-brut'];
        const chars = text.toLowerCase().split('');
        const scale = parseFloat(this.scaleSlider.value);
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockSize = 8 * scale;
        const spacing = biometric ? 0 : blockSize * 0.2;

        let svgContent = '';
        let currentX = 0;
        const maxHeight = 5 * blockSize;

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char] || patterns[' '];
            if (!pattern) return;

            const charWidth = pattern[0].length * blockSize;
            
            pattern.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell === 1) {
                        const x = currentX + (colIndex * blockSize);
                        const y = rowIndex * blockSize;
                        svgContent += `<rect x="${x}" y="${y}" width="${blockSize}" height="${blockSize}" fill="${color}"/>`;
                    }
                });
            });

            currentX += charWidth + spacing;
        });

        const totalWidth = currentX - spacing;
        this.outputSvg.setAttribute('viewBox', `0 0 ${Math.max(totalWidth, 100)} ${maxHeight}`);
        this.outputSvg.innerHTML = svgContent;

        this.updateDecodingGuide(chars, 'horizontal');
    }

    generateKvarV(text) {
        const patterns = this.getVerticalPatterns();
        const chars = text.toLowerCase().split('');
        const scale = parseFloat(this.scaleSlider.value);
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockSize = 8 * scale;
        const spacing = biometric ? 0 : blockSize * 0.2;

        let svgContent = '';
        let currentX = 0;
        const lineHeight = blockSize * 1.2;

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char] || patterns[' '];
            if (!pattern) return;

            const charHeight = Array.isArray(pattern) ? pattern.length : 1;
            const maxY = charHeight * lineHeight;

            if (Array.isArray(pattern)) {
                pattern.forEach((segment, segIndex) => {
                    if (segment === 1) {
                        const y = segIndex * lineHeight;
                        svgContent += `<rect x="${currentX}" y="${y}" width="${blockSize}" height="${lineHeight * 0.8}" fill="${color}"/>`;
                    }
                });
            } else if (pattern === 1) {
                svgContent += `<rect x="${currentX}" y="0" width="${blockSize}" height="${lineHeight * 0.8}" fill="${color}"/>`;
            }

            currentX += blockSize + spacing;
        });

        const totalWidth = currentX - spacing;
        const maxHeight = 5 * lineHeight;
        this.outputSvg.setAttribute('viewBox', `0 0 ${Math.max(totalWidth, 100)} ${maxHeight}`);
        this.outputSvg.innerHTML = svgContent;

        this.updateDecodingGuide(chars, 'vertical');
    }

    generateKvarSQ(text) {
        const patterns = this.getSquarePatterns();
        const chars = text.toLowerCase().split('');
        const scale = parseFloat(this.scaleSlider.value);
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockSize = 12 * scale;
        const spacing = biometric ? blockSize * 0.1 : blockSize * 0.3;

        let svgContent = '';
        let currentX = 0;
        let maxHeight = 0;

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char] || patterns[' '];
            if (!pattern || !Array.isArray(pattern)) return;

            const charWidth = pattern[0].length * blockSize;
            const charHeight = pattern.length * blockSize;
            maxHeight = Math.max(maxHeight, charHeight);
            
            pattern.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell === 1) {
                        const x = currentX + (colIndex * blockSize);
                        const y = rowIndex * blockSize;
                        svgContent += `<rect x="${x}" y="${y}" width="${blockSize}" height="${blockSize}" fill="${color}"/>`;
                    }
                });
            });

            currentX += charWidth + spacing;
        });

        const totalWidth = currentX - spacing;
        this.outputSvg.setAttribute('viewBox', `0 0 ${Math.max(totalWidth, 100)} ${Math.max(maxHeight, 50)}`);
        this.outputSvg.innerHTML = svgContent;

        this.updateDecodingGuide(chars, 'square');
    }

    generateEpetri(text) {
        const patterns = this.getEpetriPatterns();
        const chars = text.toLowerCase().split('');
        const scale = parseFloat(this.scaleSlider.value);
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockWidth = 4 * scale;
        const blockHeight = 30 * scale;
        const spacing = biometric ? blockWidth * 0.1 : blockWidth * 0.5;

        let svgContent = '';
        let currentX = 0;

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char] || patterns[' '];
            if (!Array.isArray(pattern)) return;

            pattern.forEach((segment, segIndex) => {
                if (segment > 0) {
                    const x = currentX + (segIndex * blockWidth);
                    // Height based on segment value (1 = short, 2 = tall)
                    const height = blockHeight * (segment === 2 ? 0.8 : 0.4);
                    const y = blockHeight - height;
                    svgContent += `<rect x="${x}" y="${y}" width="${blockWidth * 0.7}" height="${height}" fill="${color}"/>`;
                }
            });

            currentX += (pattern.length * blockWidth) + spacing;
        });

        const totalWidth = currentX - spacing;
        this.outputSvg.setAttribute('viewBox', `0 0 ${Math.max(totalWidth, 100)} ${blockHeight}`);
        this.outputSvg.innerHTML = svgContent;

        this.updateDecodingGuide(chars, 'epetri');
    }

    generateMidisH(text) {
        const patterns = this.getMidisHPatterns();
        const chars = text.toLowerCase().split('');
        const scale = parseFloat(this.scaleSlider.value);
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockSize = 8 * scale;
        const spacing = biometric ? blockSize * 0.1 : blockSize * 0.3;

        let svgContent = '';
        let currentX = 0;
        let maxHeight = 0;

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char] || patterns[' '];
            if (!Array.isArray(pattern)) return;

            const charHeight = pattern.length * blockSize;
            maxHeight = Math.max(maxHeight, charHeight);
            
            pattern.forEach((row, rowIndex) => {
                if (Array.isArray(row)) {
                    row.forEach((cell, colIndex) => {
                        if (cell === 1) {
                            const x = currentX + (colIndex * blockSize);
                            const y = rowIndex * blockSize;
                            svgContent += `<rect x="${x}" y="${y}" width="${blockSize}" height="${blockSize * 0.6}" fill="${color}"/>`;
                        }
                    });
                }
            });

            currentX += (pattern[0]?.length || 3) * blockSize + spacing;
        });

        const totalWidth = currentX - spacing;
        this.outputSvg.setAttribute('viewBox', `0 0 ${Math.max(totalWidth, 100)} ${Math.max(maxHeight, 50)}`);
        this.outputSvg.innerHTML = svgContent;

        this.updateDecodingGuide(chars, 'midis-h');
    }

    generateMidisV(text) {
        const patterns = this.getMidisVPatterns();
        const chars = text.toLowerCase().split('');
        const scale = parseFloat(this.scaleSlider.value);
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockWidth = 4 * scale;
        const blockHeight = 25 * scale;
        const spacing = biometric ? blockWidth * 0.1 : blockWidth * 0.3;

        let svgContent = '';
        let currentX = 0;

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char] || patterns[' '];
            if (!Array.isArray(pattern)) return;

            pattern.forEach((segment, segIndex) => {
                if (segment > 0) {
                    const x = currentX;
                    const height = blockHeight * (segment === 2 ? 0.9 : 0.5);
                    const y = (segIndex * (blockHeight / pattern.length)) + (blockHeight - height) / 2;
                    svgContent += `<rect x="${x}" y="${y}" width="${blockWidth * 0.8}" height="${height}" fill="${color}"/>`;
                }
            });

            currentX += blockWidth + spacing;
        });

        const totalWidth = currentX - spacing;
        this.outputSvg.setAttribute('viewBox', `0 0 ${Math.max(totalWidth, 100)} ${blockHeight}`);
        this.outputSvg.innerHTML = svgContent;

        this.updateDecodingGuide(chars, 'midis-v');
    }

    generateRicetta(text) {
        const patterns = this.getRicettaPatterns();
        const chars = text.toLowerCase().split('');
        const scale = parseFloat(this.scaleSlider.value);
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const lineHeight = 4 * scale;
        const maxWidth = 100 * scale;
        const spacing = biometric ? 2 * scale : 8 * scale;

        let svgContent = '';
        let currentY = 0;

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char] || patterns[' '];
            if (!Array.isArray(pattern)) return;

            pattern.forEach((row, rowIndex) => {
                if (Array.isArray(row)) {
                    // Create stretched horizontal lines based on pattern
                    const segments = row.length;
                    const segmentWidth = maxWidth / segments;
                    
                    row.forEach((segment, segIndex) => {
                        if (segment === 1) {
                            const x = segIndex * segmentWidth;
                            const width = segmentWidth * 0.8;
                            svgContent += `<rect x="${x}" y="${currentY}" width="${width}" height="${lineHeight}" fill="${color}"/>`;
                        }
                    });
                }
                currentY += lineHeight + (lineHeight * 0.2);
            });

            currentY += spacing;
        });

        const totalHeight = currentY - spacing;
        this.outputSvg.setAttribute('viewBox', `0 0 ${maxWidth} ${Math.max(totalHeight, 50)}`);
        this.outputSvg.innerHTML = svgContent;

        this.updateDecodingGuide(chars, 'ricetta');
    }

    generateVitkovacH(text) {
        const patterns = this.getVitkovacHPatterns();
        const chars = text.toLowerCase().split('');
        const scale = parseFloat(this.scaleSlider.value);
        const fontType = this.fontSelect.value;
        
        // Use separate colors for Vitkovac, regular color for others
        let mainLineColor, alterationColor;
        if (fontType.startsWith('vitkovac')) {
            if (this.colorExperimentToggle.checked) {
                // Color experiment: use separate colors
                mainLineColor = this.mainLineColorPicker.value;
                alterationColor = this.alterationColorPicker.value;
            } else {
                // Standard: use same color for both
                mainLineColor = this.colorPicker.value;
                alterationColor = this.colorPicker.value;
            }
        } else {
            // Non-Vitkovac fonts use regular color picker
            mainLineColor = this.colorPicker.value;
            alterationColor = this.colorPicker.value;
        }
        const indexColor = mainLineColor;  // Index uses main line color
        
        const form = this.formSelect.value;  // 'perm' or 'tite'
        const weight = this.weightSelect.value;  // 'thin', 'regular', 'bold', 'heavy'
        const indexStyle = this.indexStyleSelect.value;  // 'off' or 'rectangle'
        
        // Weight mapping to stroke thickness (improved visual distribution)
        const weightMap = {
            'thin': 0.08,     // Very light, delicate lines
            'regular': 0.25,  // Standard readable thickness
            'bold': 0.45,     // Strong, clear presence
            'heavy': 0.8      // Maximum impact, architectural weight
        };
        const strokeThickness = weightMap[weight];
        const doubleThickness = strokeThickness * 2;  // For boundary markers
        
        // Form mapping to alteration line heights (PERM = taller, TITE = shorter)
        const formMap = {
            'perm': 2.5,
            'tite': 1.8
        };
        const formMultiplier = formMap[form];
        
        const blockSize = 8 * scale;
        const altLineHeight = blockSize * formMultiplier;
        const mainLineY = altLineHeight + blockSize;  // Main line positioned with room above/below
        const mainLineThickness = blockSize * strokeThickness;
        const altLineThickness = blockSize * strokeThickness;
        const totalHeight = altLineHeight * 2 + blockSize * 2;
        
        // No spacing between characters - they share the main line
        let svgContent = '';
        let currentX = 0;
        const glyphPositions = [];  // Track positions for index placement

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char] || patterns[char.toLowerCase()] || patterns[' '];
            if (!pattern) return;

            const unitWidth = blockSize;  // Each unit is one block
            const charWidth = pattern.width * unitWidth;
            const isLastChar = charIndex === chars.length - 1;
            
            // Special handling for I/i and numerals 1 - make them taller/deeper
            const isINumeralOne = (char.toLowerCase() === 'i' || char === '1');
            const iExtension = isINumeralOne ? altLineHeight * 0.5 : 0;
            
            // Auto-leveling: apply main line offset for alternate glyphs
            const mainLineOffset = pattern.mainLineOffset || 0;
            const adjustedMainLineY = mainLineY + (mainLineOffset * blockSize);
            
            glyphPositions.push({ start: currentX, end: currentX + charWidth, char, mainLineY: adjustedMainLineY });
            
            // Draw main horizontal line for this character
            if (!pattern.carveMain) {
                // Normal characters get full main line
                let lineThickness = mainLineThickness;
                
                // Double-thick boundary markers (when no index)
                if (indexStyle === 'off') {
                    // First segment (start of glyph)
                    if (charIndex > 0) {
                        svgContent += `<rect x="${currentX}" y="${adjustedMainLineY}" width="${unitWidth * 0.3}" height="${blockSize * doubleThickness}" fill="${mainLineColor}"/>`;
                    }
                    // Last segment (end of glyph)  
                    if (!isLastChar) {
                        svgContent += `<rect x="${currentX + charWidth - unitWidth * 0.3}" y="${adjustedMainLineY}" width="${unitWidth * 0.3}" height="${blockSize * doubleThickness}" fill="${mainLineColor}"/>`;
                    }
                    // Middle segments (regular thickness)
                    if (charWidth > unitWidth * 0.6) {
                        svgContent += `<rect x="${currentX + unitWidth * 0.3}" y="${adjustedMainLineY}" width="${charWidth - unitWidth * 0.6}" height="${mainLineThickness}" fill="${mainLineColor}"/>`;
                    }
                } else {
                    // Regular main line when index is used
                    svgContent += `<rect x="${currentX}" y="${adjustedMainLineY}" width="${charWidth}" height="${mainLineThickness}" fill="${mainLineColor}"/>`;
                }
            } else {
                // S and Z: carve out middle section of main line for universality
                // More precise carving based on character patterns
                let carveStart, carveEnd;
                if (char === 's') {
                    // S: carve middle-right section  
                    carveStart = currentX + charWidth * 0.4;
                    carveEnd = currentX + charWidth * 0.8;
                } else if (char === 'z') {
                    // Z: carve middle-left section
                    carveStart = currentX + charWidth * 0.2;
                    carveEnd = currentX + charWidth * 0.6;
                } else {
                    // Default carving for other characters that might need it
                    carveStart = currentX + charWidth * 0.3;
                    carveEnd = currentX + charWidth * 0.7;
                }
                
                // Draw main line segments around the carved section
                svgContent += `<rect x="${currentX}" y="${adjustedMainLineY}" width="${carveStart - currentX}" height="${mainLineThickness}" fill="${mainLineColor}"/>`;
                svgContent += `<rect x="${carveEnd}" y="${adjustedMainLineY}" width="${currentX + charWidth - carveEnd}" height="${mainLineThickness}" fill="${mainLineColor}"/>`;
            }
            
            // Draw upward alteration lines
            pattern.up.forEach(pos => {
                const x = currentX + (pos * unitWidth) + (unitWidth - altLineThickness) / 2;
                const height = altLineHeight + (isINumeralOne ? iExtension : 0);
                svgContent += `<rect x="${x}" y="${adjustedMainLineY - height}" width="${altLineThickness}" height="${height}" fill="${alterationColor}"/>`;
            });
            
            // Draw downward alteration lines  
            pattern.down.forEach(pos => {
                const x = currentX + (pos * unitWidth) + (unitWidth - altLineThickness) / 2;
                const height = altLineHeight + (isINumeralOne ? iExtension : 0);
                svgContent += `<rect x="${x}" y="${adjustedMainLineY + mainLineThickness}" width="${altLineThickness}" height="${height}" fill="${alterationColor}"/>`;
            });

            currentX += charWidth;
        });
        
        // Draw index connectors if enabled
        if (indexStyle === 'rectangle') {
            for (let i = 0; i < glyphPositions.length - 1; i++) {
                const currentGlyph = glyphPositions[i];
                const nextGlyph = glyphPositions[i + 1];
                
                // Index positioned exactly between end of current and start of next
                // Use average Y position between current and next glyph for smooth leveling
                const avgMainLineY = (currentGlyph.mainLineY + nextGlyph.mainLineY) / 2;
                const indexX = currentGlyph.end - (blockSize * strokeThickness / 2);
                const indexWidth = blockSize * strokeThickness;
                const indexHeight = blockSize * strokeThickness * 2;
                const indexY = avgMainLineY - indexHeight / 2 + mainLineThickness / 2;
                
                svgContent += `<rect x="${indexX}" y="${indexY}" width="${indexWidth}" height="${indexHeight}" fill="${indexColor}" opacity="0.7"/>`;
            }
        }

        const totalWidth = currentX;
        this.outputSvg.setAttribute('viewBox', `0 0 ${Math.max(totalWidth, 100)} ${totalHeight}`);
        this.outputSvg.innerHTML = svgContent;

        this.updateDecodingGuide(chars, 'vitkovac-h');
    }

    generateVitkovacV(text) {
        const patterns = this.getVitkovacVPatterns();
        const scale = parseFloat(this.scaleSlider.value);
        const fontType = this.fontSelect.value;
        
        // Use color system like Vitkovac H
        let mainLineColor, alterationColor;
        if (fontType.startsWith('vitkovac')) {
            if (this.colorExperimentToggle.checked) {
                mainLineColor = this.mainLineColorPicker.value;
                alterationColor = this.alterationColorPicker.value;
            } else {
                mainLineColor = this.colorPicker.value;
                alterationColor = this.colorPicker.value;
            }
        } else {
            mainLineColor = this.colorPicker.value;
            alterationColor = this.colorPicker.value;
        }
        
        const form = this.formSelect.value;
        const weight = this.weightSelect.value;
        const indexStyle = this.indexStyleSelect.value;
        
        // Weight and form mapping like Vitkovac H
        const weightMap = {
            'thin': 0.08,
            'regular': 0.25,
            'bold': 0.45,
            'heavy': 0.8
        };
        const strokeThickness = weightMap[weight];
        
        const formMap = {
            'perm': 2.5,
            'tite': 1.8
        };
        const formMultiplier = formMap[form];
        
        const blockSize = 8 * scale;
        const altLineWidth = blockSize * formMultiplier;
        const mainLineThickness = blockSize * strokeThickness;
        const altLineThickness = blockSize * strokeThickness;
        const unitHeight = blockSize;  // Each character unit height
        
        // Parse text for columns (split on newlines/Enter key)
        const columns = text.split('\n').filter(col => col.length > 0);
        if (columns.length === 0) columns.push('hello');  // Default text
        
        let svgContent = '';
        let currentColumnX = altLineWidth; // Start with space for left alteration lines
        const maxColumnHeight = 8 * unitHeight; // Max characters per column
        
        columns.forEach((columnText, colIndex) => {
            const chars = columnText.toLowerCase().split('');
            let currentY = 0;
            const mainLineX = currentColumnX;
            const glyphPositions = []; // Track for index placement
            
            // Calculate total column height
            const totalColumnHeight = chars.reduce((height, char) => {
                const pattern = patterns[char] || patterns[' '];
                return height + (pattern.height * unitHeight);
            }, 0);
            
            chars.forEach((char, charIndex) => {
                const pattern = patterns[char] || patterns[char.toLowerCase()] || patterns[' '];
                if (!pattern) return;
                
                const charHeight = pattern.height * unitHeight;
                const isLastChar = charIndex === chars.length - 1;
                
                // Auto-leveling: apply main line X offset for alternate glyphs
                const mainLineXOffset = pattern.mainLineXOffset || 0;
                const adjustedMainLineX = mainLineX + (mainLineXOffset * blockSize);
                
                glyphPositions.push({ start: currentY, end: currentY + charHeight, char, mainLineX: adjustedMainLineX });
                
                // Draw main vertical line for this character
                if (indexStyle === 'off') {
                    // Double-thick boundary markers
                    const doubleThickness = strokeThickness * 2;
                    if (charIndex > 0) {
                        svgContent += `<rect x="${adjustedMainLineX}" y="${currentY}" width="${blockSize * doubleThickness}" height="${unitHeight * 0.3}" fill="${mainLineColor}"/>`;
                    }
                    if (!isLastChar) {
                        svgContent += `<rect x="${adjustedMainLineX}" y="${currentY + charHeight - unitHeight * 0.3}" width="${blockSize * doubleThickness}" height="${unitHeight * 0.3}" fill="${mainLineColor}"/>`;
                    }
                    // Middle segments (regular thickness)
                    if (charHeight > unitHeight * 0.6) {
                        svgContent += `<rect x="${adjustedMainLineX}" y="${currentY + unitHeight * 0.3}" width="${mainLineThickness}" height="${charHeight - unitHeight * 0.6}" fill="${mainLineColor}"/>`;
                    }
                } else {
                    // Regular main line when index is used
                    svgContent += `<rect x="${adjustedMainLineX}" y="${currentY}" width="${mainLineThickness}" height="${charHeight}" fill="${mainLineColor}"/>`;
                }
                
                // Draw left alteration lines
                pattern.left.forEach(pos => {
                    const y = currentY + (pos * unitHeight) + (unitHeight - altLineThickness) / 2;
                    svgContent += `<rect x="${adjustedMainLineX - altLineWidth}" y="${y}" width="${altLineWidth}" height="${altLineThickness}" fill="${alterationColor}"/>`;
                });
                
                // Draw right alteration lines
                pattern.right.forEach(pos => {
                    const y = currentY + (pos * unitHeight) + (unitHeight - altLineThickness) / 2;
                    svgContent += `<rect x="${adjustedMainLineX + mainLineThickness}" y="${y}" width="${altLineWidth}" height="${altLineThickness}" fill="${alterationColor}"/>`;
                });
                
                currentY += charHeight;
            });
            
            // Draw index connectors for this column if enabled
            if (indexStyle === 'rectangle') {
                for (let i = 0; i < glyphPositions.length - 1; i++) {
                    const currentGlyph = glyphPositions[i];
                    const nextGlyph = glyphPositions[i + 1];
                    
                    // Vertical index positioned between characters
                    // Use average X position between current and next glyph for smooth leveling
                    const avgMainLineX = (currentGlyph.mainLineX + nextGlyph.mainLineX) / 2;
                    const indexY = currentGlyph.end - (blockSize * strokeThickness / 2);
                    const indexHeight = blockSize * strokeThickness;
                    const indexWidth = blockSize * strokeThickness * 2;
                    const indexX = avgMainLineX - indexWidth / 2 + mainLineThickness / 2;
                    
                    svgContent += `<rect x="${indexX}" y="${indexY}" width="${indexWidth}" height="${indexHeight}" fill="${mainLineColor}" opacity="0.7"/>`;
                }
            }
            
            // Move to next column position
            currentColumnX += altLineWidth * 2 + mainLineThickness + (blockSize * 2); // Space between columns
        });
        
        const totalWidth = currentColumnX + altLineWidth;
        const totalHeight = maxColumnHeight;
        this.outputSvg.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);
        this.outputSvg.innerHTML = svgContent;

        this.updateDecodingGuide(columns.join('').split(''), 'vitkovac-v');
    }

    generateFont() {
        const text = this.textInput.value.trim() || 'hello';
        const fontType = this.fontSelect.value;

        switch (fontType) {
            case 'kvar-h-brut':
                this.generateKvarH(text, 'brut');
                break;
            case 'kvar-h-tite':
                this.generateKvarH(text, 'tite');
                break;
            case 'kvar-h-firstborn':
                this.generateKvarH(text, 'firstborn');
                break;
            case 'kvar-v':
                this.generateKvarV(text);
                break;
            case 'kvar-sq':
                this.generateKvarSQ(text);
                break;
            case 'epetri':
                this.generateEpetri(text);
                break;
            case 'midis-h':
                this.generateMidisH(text);
                break;
            case 'midis-v':
                this.generateMidisV(text);
                break;
            case 'ricetta':
                this.generateRicetta(text);
                break;
            case 'vitkovac-h':
                this.generateVitkovacH(text);
                break;
            case 'vitkovac-v':
                this.generateVitkovacV(text);
                break;
            default:
                this.generateKvarH(text, 'brut');
        }
    }

    updateDecodingGuide(chars, type) {
        this.decodingGuide.innerHTML = '';
        
        chars.forEach(char => {
            if (char === ' ') return;
            
            const breakdown = document.createElement('div');
            breakdown.className = 'character-breakdown';
            
            const charDiv = document.createElement('div');
            charDiv.className = 'char';
            charDiv.textContent = char.toUpperCase();
            
            const patternDiv = document.createElement('div');
            patternDiv.className = 'pattern';
            
            let patternText = '';
            switch (type) {
                case 'horizontal':
                    patternText = 'Horizontal blocks';
                    break;
                case 'vertical':
                    patternText = 'Vertical segments';
                    break;
                case 'square':
                    patternText = 'Square blocks';
                    break;
                case 'epetri':
                    patternText = 'Waveform bars';
                    break;
                case 'midis-h':
                    patternText = 'Horizontal rectangles';
                    break;
                case 'midis-v':
                    patternText = 'Vertical segments';
                    break;
                case 'ricetta':
                    patternText = 'Stretched lines';
                    break;
                case 'vitkovac-h':
                    const currentForm = this.formSelect.value.toUpperCase();
                    const currentWeight = this.weightSelect.value;
                    const currentIndex = this.indexStyleSelect.value;
                    patternText = `${currentForm} ${currentWeight} | Index: ${currentIndex} | Supports: letters, numerals, alternates (A-Z)`;
                    break;
                case 'vitkovac-v':
                    patternText = 'Vertical columns | Supports: letters, numerals, alternates (A-Z) | Enter = new column';
                    break;
            }
            patternDiv.textContent = patternText;
            
            breakdown.appendChild(charDiv);
            breakdown.appendChild(patternDiv);
            this.decodingGuide.appendChild(breakdown);
        });
    }

    copySvg() {
        const svgString = new XMLSerializer().serializeToString(this.outputSvg);
        navigator.clipboard.writeText(svgString).then(() => {
            this.showSuccessMessage('SVG copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            this.showSuccessMessage('Copy failed. Please try again.');
        });
    }

    downloadSvg() {
        const svgString = new XMLSerializer().serializeToString(this.outputSvg);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `atypography-${this.fontSelect.value}-${Date.now()}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSuccessMessage('SVG downloaded!');
    }

    showSuccessMessage(message) {
        const existing = document.querySelector('.success-message');
        if (existing) existing.remove();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => messageDiv.classList.add('show'), 100);
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BiometricFontGenerator();
});