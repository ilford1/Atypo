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
        this.exportSize = document.getElementById('exportSize');
        this.colorPicker = document.getElementById('colorPicker');
        this.outputSvg = document.getElementById('outputSvg');
        this.decodingGuide = document.getElementById('decodingGuide');
        this.copyBtn = document.getElementById('copyBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.downloadPngBtn = document.getElementById('downloadPngBtn');
        this.transparentBgToggle = document.getElementById('transparentBgToggle');
        
        // Epetri-specific controls
        this.epetriWeightSelect = document.getElementById('epetriWeightSelect');
        this.epetriFormSelect = document.getElementById('epetriFormSelect');
        this.epetriIndexToggle = document.getElementById('epetriIndexToggle');
        
        // Ricetta-specific controls
        this.ricettaWeightSelect = document.getElementById('ricettaWeightSelect');
        this.ricettaOrientationSelect = document.getElementById('ricettaOrientationSelect');
        this.ricettaSpacingToggle = document.getElementById('ricettaSpacingToggle');
        
        // Vitkovac-specific controls
        this.formSelect = document.getElementById('formSelect');
        this.weightSelect = document.getElementById('weightSelect');
        this.indexStyleSelect = document.getElementById('indexStyleSelect');
        this.mainLineColorPicker = document.getElementById('mainLineColorPicker');
        this.alterationColorPicker = document.getElementById('alterationColorPicker');
        this.colorExperimentToggle = document.getElementById('colorExperimentToggle');
        
        // Visual Poetry-specific controls
        this.poetryModeSelect = document.getElementById('poetryModeSelect');
        this.templateSelect = document.getElementById('templateSelect');
        this.templateSelectGroup = document.getElementById('templateSelectGroup');
        this.poetryFontSelect = document.getElementById('poetryFontSelect');
        this.spacingIntensity = document.getElementById('spacingIntensity');
        this.rotationVariance = document.getElementById('rotationVariance');
        this.scaleVariance = document.getElementById('scaleVariance');
        this.layerOpacity = document.getElementById('layerOpacity');
        this.semanticSpacing = document.getElementById('semanticSpacing');
        this.wordBreaking = document.getElementById('wordBreaking');
        
        // Visual Poetry canvas elements
        this.poetryCanvas = document.getElementById('poetryCanvas');
        this.poetrySvg = document.getElementById('poetrySvg');
    }

    setupEventListeners() {
        this.textInput.addEventListener('input', () => this.generateFont());
        this.fontSelect.addEventListener('change', () => {
            this.updateControlVisibility();
            this.generateFont();
        });
        this.biometricToggle.addEventListener('change', () => this.generateFont());
        this.colorPicker.addEventListener('change', () => this.generateFont());
        
        // Epetri controls
        this.epetriWeightSelect.addEventListener('change', () => this.generateFont());
        this.epetriFormSelect.addEventListener('change', () => this.generateFont());
        this.epetriIndexToggle.addEventListener('change', () => this.generateFont());
        
        // Ricetta controls
        this.ricettaWeightSelect.addEventListener('change', () => this.generateFont());
        this.ricettaOrientationSelect.addEventListener('change', () => this.generateFont());
        this.ricettaSpacingToggle.addEventListener('change', () => this.generateFont());
        
        // Vitkovac controls
        this.formSelect.addEventListener('change', () => this.generateFont());
        this.weightSelect.addEventListener('change', () => this.generateFont());
        this.indexStyleSelect.addEventListener('change', () => this.generateFont());
        this.mainLineColorPicker.addEventListener('change', () => this.generateFont());
        this.alterationColorPicker.addEventListener('change', () => this.generateFont());
        this.colorExperimentToggle.addEventListener('change', () => this.generateFont());
        
        // Visual Poetry controls
        this.poetryModeSelect.addEventListener('change', () => {
            this.updateTemplateVisibility();
            this.generateFont();
        });
        this.templateSelect.addEventListener('change', () => this.generateFont());
        this.poetryFontSelect.addEventListener('change', () => this.generateFont());
        this.spacingIntensity.addEventListener('input', () => {
            document.getElementById('spacingIntensityValue').textContent = this.spacingIntensity.value;
            this.generateFont();
        });
        this.rotationVariance.addEventListener('input', () => {
            document.getElementById('rotationVarianceValue').textContent = this.rotationVariance.value + '°';
            this.generateFont();
        });
        this.scaleVariance.addEventListener('input', () => {
            document.getElementById('scaleVarianceValue').textContent = this.scaleVariance.value + '%';
            this.generateFont();
        });
        this.layerOpacity.addEventListener('input', () => {
            document.getElementById('layerOpacityValue').textContent = this.layerOpacity.value + '%';
            this.generateFont();
        });
        this.semanticSpacing.addEventListener('change', () => this.generateFont());
        this.wordBreaking.addEventListener('change', () => this.generateFont());
        
        // Initialize control visibility
        this.updateControlVisibility();
        this.copyBtn.addEventListener('click', () => this.copySvg());
        this.downloadBtn.addEventListener('click', () => this.downloadSvg());
        this.downloadPngBtn.addEventListener('click', () => this.downloadPng());
        this.transparentBgToggle.addEventListener('change', () => this.updateSvgBackground());
    }

    updateControlVisibility() {
        const selectedFont = this.fontSelect.value;
        const epetriControls = document.getElementById('epetriControls');
        const ricettaControls = document.getElementById('ricettaControls');
        const vitkovacControls = document.getElementById('vitkovacControls');
        const visualPoetryControls = document.getElementById('visualPoetryControls');
        
        // Show/hide Epetri controls
        if (selectedFont === 'epetri') {
            epetriControls.classList.add('show');
        } else {
            epetriControls.classList.remove('show');
        }
        
        // Show/hide Ricetta controls
        if (selectedFont === 'ricetta') {
            ricettaControls.classList.add('show');
        } else {
            ricettaControls.classList.remove('show');
        }
        
        // Show/hide Vitkovac controls
        if (selectedFont.startsWith('vitkovac')) {
            vitkovacControls.classList.add('show');
        } else {
            vitkovacControls.classList.remove('show');
        }
        
        // Show/hide Visual Poetry controls and switch canvas
        if (selectedFont === 'visual-poetry') {
            visualPoetryControls.classList.add('show');
            // Show poetry canvas, hide regular output
            this.outputSvg.style.display = 'none';
            this.poetryCanvas.style.display = 'block';
            this.updateTemplateVisibility();
        } else {
            visualPoetryControls.classList.remove('show');
            // Show regular output, hide poetry canvas
            this.outputSvg.style.display = 'block';
            this.poetryCanvas.style.display = 'none';
            // Hide all poetry controls when not in visual poetry mode
            const poetryControls = document.querySelectorAll('.poetry-control');
            poetryControls.forEach(control => control.classList.remove('active'));
        }
    }

    updateTemplateVisibility() {
        if (this.poetryModeSelect && this.templateSelectGroup) {
            const showTemplates = this.poetryModeSelect.value === 'template';
            this.templateSelectGroup.style.display = showTemplates ? 'flex' : 'none';
        }
        
        // Update poetry control visibility based on selected mode
        this.updatePoetryControlVisibility();
    }

    updatePoetryControlVisibility() {
        if (!this.poetryModeSelect) return;
        
        const selectedMode = this.poetryModeSelect.value;
        const poetryControls = document.querySelectorAll('.poetry-control');
        
        poetryControls.forEach(control => {
            const supportedModes = control.getAttribute('data-modes');
            if (supportedModes) {
                const modes = supportedModes.split(',');
                if (modes.includes(selectedMode)) {
                    control.classList.add('active');
                } else {
                    control.classList.remove('active');
                }
            }
        });
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
        // Based on Epetri character set from Atypography document (page 54-55)
        // Epetri is a readable waveform with vertical lines of varying heights
        // Format: [line_heights] where 0=no line, 1=short, 2=medium, 3=tall
        // Key rule: each column (glyph) can only have one vertical line for readability
        return {
            // Lowercase letters - based on AIRY-regular2 character set
            'a': [3,1,0,3],      // A - distinctive pattern with tall outer lines
            'b': [3,1,1,0],      // B - starts tall, drops to medium
            'c': [0,3,1,1],      // C - curved opening pattern
            'd': [1,1,1,3],      // D - builds to tall ending
            'e': [3,1,0,0],      // E - strong start, trails off
            'f': [3,1,2],        // F - tall start, medium accent
            'g': [1,2,0],        // G - gentle rise and fall
            'h': [3,1,1,1],      // H - consistent after tall start
            'i': [1,1,1],        // I - simple consistent pattern
            'j': [0,1,1],        // J - gentle rise
            'k': [1,3,1,0],      // K - peaks in middle
            'l': [1,1,0,0],      // L - simple start
            'm': [3,1,2,1,3],    // M - outer peaks, inner valley
            'n': [3,1,1,3],      // N - strong outer lines
            'o': [0,3,1,0],      // O - centered peak
            'p': [3,1,2,1],      // P - descending pattern
            'q': [1,2,1,3],      // Q - ascending pattern with tail
            'r': [1,3,2,1],      // R - central peak
            's': [0,1,3,2],      // S - wave-like curve
            't': [2,3,1,2],      // T - peaked center
            'u': [1,0,0,1],      // U - cup shape
            'v': [1,0,1,0],      // V - valley pattern
            'w': [1,0,2,0,1],    // W - double valley
            'x': [0,1,3],        // X - rising diagonal
            'y': [1,0,1,3],      // Y - irregular rise
            'z': [2,1,1,0],      // Z - diagonal descent
            
            // Uppercase variants - different heights for case variation
            'A': [3,2,0,3],      // Slightly different from lowercase
            'B': [3,2,2,0],      // Higher middle section
            'C': [0,3,2,1],      // Extended curve
            'D': [2,1,1,3],      // Different proportion
            'E': [3,2,0,0],      // Stronger start
            'F': [3,2,3],        // Dual peaks
            'G': [2,3,0],        // Higher peak
            'H': [3,2,1,2],      // More variation
            'I': [2,1,2],        // Taller bookends
            'J': [0,2,2],        // Higher rise
            'K': [2,3,2,0],      // Extended peak
            'L': [2,1,0,0],      // Taller start
            'M': [3,2,3,2,3],    // All peaks higher
            'N': [3,2,2,3],      // Higher middle
            'O': [0,3,2,0],      // Higher center
            'P': [3,2,3,1],      // More dramatic
            'Q': [2,3,1,3],      // Higher elements
            'R': [2,3,3,1],      // Double peak
            'S': [0,2,3,3],      // Rising wave
            'T': [3,3,2,3],      // Crown pattern
            'U': [2,0,0,2],      // Deeper valley
            'V': [2,0,2,0],      // Deeper valley
            'W': [2,0,3,0,2],    // Central spike
            'X': [0,2,3],        // Steeper rise
            'Y': [2,0,2,3],      // Different balance
            'Z': [3,2,1,0],      // Steeper descent
            
            // Numbers - distinctive patterns
            '0': [1,3,1],        // Oval suggestion
            '1': [3],            // Single tall line
            '2': [0,2,1,3],      // Rising pattern
            '3': [0,3,0,3],      // Double peaks
            '4': [1,3,0,1],      // Gate pattern
            '5': [3,0,1,3],      // S-like curve
            '6': [3,1,3],        // Circle suggestion
            '7': [0,0,2,1],      // Descending
            '8': [2,3,2],        // Figure-8 hint
            '9': [3,1,0,2],      // Spiral suggestion
            
            // Punctuation
            '.': [1],            // Simple dot
            ',': [1],            // Same as dot in waveform
            '?': [0,3,1,1],      // Question curve
            '!': [3,0,1],        // Exclamation pattern
            ':': [1,0,1],        // Colon as two peaks
            ';': [1,0,1],        // Same as colon
            
            ' ': [0]             // Space - no line
        };
    }

    getMidisHPatterns() {
        // Based on Midis H character set from page 64 of Atypography2.pdf
        // Key principles: horizontal rectangles with diagonal movement only
        // No adjacent rectangles (horizontally or vertically) - must skip diagonally
        // Vertical movement without diagonal allowed when skipping one field ("body" or closed counter)
        // Format: [[row1], [row2], ...] where each row contains horizontal positions
        return {
            // Lowercase letters following diagonal movement rules
            'a': [[1,0,1],[0,1,0]],           // A pattern with diagonal movement
            'b': [[1,1,0],[0,0,1]],           // B with proper diagonal skips
            'c': [[1,1,0]],                   // C simple pattern
            'd': [[0,1,1],[1,0,0]],           // D diagonal movement
            'e': [[1,0,1],[0,1,0]],           // E with skipped center
            'f': [[1,1,0],[0,0,1]],           // F diagonal pattern
            'g': [[1,0,1]],                   // G simple
            'h': [[1,0,0],[0,1,1]],           // H diagonal movement
            'i': [[1]],                       // I single column ("body")
            'j': [[0,1,0]],                   // J centered
            'k': [[1,0,0],[0,1,0],[0,0,1]],   // K complex diagonal
            'l': [[1,0,0]],                   // L simple start
            'm': [[1,0,1],[0,1,0],[1,0,1]],   // M multiple "bodies"
            'n': [[1,0,1],[0,1,0]],           // N diagonal pattern
            'o': [[0,1,0],[1,0,1],[0,1,0]],   // O closed counter pattern
            'p': [[1,1,0],[0,0,1]],           // P diagonal
            'q': [[0,1,1],[1,0,0]],           // Q diagonal with tail
            'r': [[1,1,0],[0,0,1]],           // R diagonal pattern
            's': [[0,1,1],[1,0,0],[0,1,1]],   // S wave diagonal
            't': [[1,0,1]],                   // T simple pattern
            'u': [[1,0,1],[0,1,0]],           // U cup pattern
            'v': [[1,0,1],[0,1,0]],           // V valley
            'w': [[1,0,1],[0,1,0],[1,0,1]],   // W double valley
            'x': [[1,0,1],[0,1,0],[1,0,1]],   // X crossing pattern
            'y': [[1,0,1],[0,1,0]],           // Y pattern
            'z': [[1,1,0],[0,0,1],[1,1,0]],   // Z zigzag
            
            // Uppercase variants with different diagonal patterns
            'A': [[0,1,0],[1,0,1],[1,1,1]],   // Classic A shape
            'B': [[1,1,0],[1,0,1],[1,1,0]],   // B with middle connection
            'C': [[0,1,1],[1,0,0],[0,1,1]],   // C curve pattern
            'D': [[1,1,0],[1,0,1],[1,1,0]],   // D rounded pattern
            'E': [[1,1,1],[1,0,0],[1,1,1]],   // E with horizontal lines
            'F': [[1,1,1],[1,0,0],[1,0,0]],   // F pattern
            'G': [[0,1,1],[1,0,0],[1,0,1]],   // G with opening
            'H': [[1,0,1],[1,1,1],[1,0,1]],   // H with crossbar
            'I': [[1,1,1],[0,1,0],[1,1,1]],   // I with serifs
            'J': [[1,1,1],[0,0,1],[1,1,0]],   // J curve
            'K': [[1,0,1],[1,1,0],[1,0,1]],   // K diagonal meeting
            'L': [[1,0,0],[1,0,0],[1,1,1]],   // L angle
            'M': [[1,0,1],[1,1,1],[1,0,1]],   // M peaks
            'N': [[1,0,1],[1,1,1],[1,0,1]],   // N diagonal
            'O': [[0,1,0],[1,0,1],[0,1,0]],   // O oval
            'P': [[1,1,0],[1,0,1],[1,0,0]],   // P pattern
            'Q': [[0,1,0],[1,0,1],[0,1,1]],   // Q with tail
            'R': [[1,1,0],[1,0,1],[1,0,1]],   // R with leg
            'S': [[0,1,1],[0,1,0],[1,1,0]],   // S curve
            'T': [[1,1,1],[0,1,0],[0,1,0]],   // T pattern
            'U': [[1,0,1],[1,0,1],[0,1,0]],   // U curve
            'V': [[1,0,1],[1,0,1],[0,1,0]],   // V meeting
            'W': [[1,0,1],[1,0,1],[1,1,1]],   // W pattern
            'X': [[1,0,1],[0,1,0],[1,0,1]],   // X crossing
            'Y': [[1,0,1],[0,1,0],[0,1,0]],   // Y meeting
            'Z': [[1,1,1],[0,1,0],[1,1,1]],   // Z zigzag
            
            // Numbers with diagonal patterns
            '0': [[0,1,0],[1,0,1],[0,1,0]],   // Oval
            '1': [[1]],                       // Single line
            '2': [[0,1,1],[0,1,0],[1,1,0]],   // 2 pattern
            '3': [[0,1,1],[0,1,1],[0,1,1]],   // 3 curves
            '4': [[1,0,1],[0,1,1],[0,0,1]],   // 4 angle
            '5': [[1,1,0],[0,1,0],[0,1,1]],   // 5 pattern
            '6': [[0,1,0],[1,1,0],[0,1,0]],   // 6 curve
            '7': [[1,1,1],[0,0,1],[0,0,1]],   // 7 angle
            '8': [[0,1,0],[0,1,0],[0,1,0]],   // 8 double oval
            '9': [[0,1,0],[0,1,1],[0,1,0]],   // 9 pattern
            
            ' ': [[0]]                        // Space - empty
        };
    }

    getMidisVPatterns() {
        // Based on Midis V character set from page 71 of Atypography2.pdf
        // FB (Firstborn), SQ (Square), CN (Condensed) forms with varying heights
        // Format: [segment_heights] where 0=empty, 1=short, 2=medium, 3=tall
        return {
            // Lowercase letters - FB-MN-midi-PR-index patterns from page 71
            'a': [1,0],                    // Simple pattern
            'b': [1,0],                    // Similar to 'a'
            'c': [1,0],                    // Consistent pattern
            'd': [1,0],                    // Simple ending
            'e': [1,0],                    // E pattern
            'f': [1,0],                    // F pattern
            'g': [1,0],                    // G similar
            'h': [1,0],                    // H pattern
            'i': [1],                      // Single segment
            'j': [0,1],                    // J with descender
            'k': [1,0],                    // K pattern
            'l': [1,0],                    // L pattern
            'm': [1,1,1],                  // M triple pattern
            'n': [1,1,1],                  // N similar to M
            'o': [1,1,1],                  // O pattern
            'p': [1,1],                    // P double
            'q': [1,1,1],                  // Q with tail
            'r': [1],                      // R single
            's': [0,1,2],                  // S with height variation
            't': [2,1,1],                  // T with tall start
            'u': [1,0],                    // U pattern
            'v': [1,1,1,1],                // V extended
            'w': [1,1,1],                  // W pattern
            'x': [1,1],                    // X double
            'y': [1,2],                    // Y with variation
            'z': [1,1,0],                  // Z pattern
            
            // Uppercase variants with different heights and patterns
            'A': [2,0],                    // Taller A
            'B': [2,0],                    // Taller B
            'C': [2,0],                    // Taller C
            'D': [2,0],                    // Taller D
            'E': [2,0],                    // Taller E
            'F': [2,0],                    // Taller F
            'G': [2,0],                    // Taller G
            'H': [2,0],                    // Taller H
            'I': [2],                      // Taller single
            'J': [0,2],                    // Taller J
            'K': [2,0],                    // Taller K
            'L': [2,0],                    // Taller L
            'M': [2,2,2],                  // Triple tall M
            'N': [2,2,2],                  // Triple tall N
            'O': [2,2,2],                  // Triple tall O
            'P': [2,2],                    // Double tall P
            'Q': [2,2,2],                  // Triple tall Q
            'R': [2],                      // Tall single R
            'S': [0,2,3],                  // S with max height variation
            'T': [3,2,2],                  // T with tallest start
            'U': [2,0],                    // Tall U
            'V': [2,2,2,2],                // Extended tall V
            'W': [2,2,2],                  // Triple tall W
            'X': [2,2],                    // Double tall X
            'Y': [2,3],                    // Y with max variation
            'Z': [2,2,0],                  // Tall Z pattern
            
            // Numbers with distinctive vertical patterns
            '0': [1,2,1],                  // 0 oval pattern
            '1': [3],                      // 1 tallest single
            '2': [0,2,3],                  // 2 ascending
            '3': [1,2,1],                  // 3 wave pattern
            '4': [2,0,1],                  // 4 gate pattern
            '5': [2,1,2],                  // 5 pattern
            '6': [2,2,1],                  // 6 descending
            '7': [3,1,0],                  // 7 descending from tall
            '8': [1,3,1],                  // 8 with tall center
            '9': [1,2,2],                  // 9 ascending pattern
            
            // Punctuation
            '.': [1],                      // Dot
            ',': [1],                      // Comma same as dot
            '?': [0,2,1],                  // Question mark pattern
            '!': [2,0],                    // Exclamation
            ':': [1,0,1],                  // Colon double
            ';': [1,0,1],                  // Semicolon same
            
            ' ': [0]                       // Space - empty
        };
    }

    getRicettaPatterns() {
        // Based on Ricetta character set from page 73 of Atypography2.pdf
        // Extremely stretched horizontal lines with gaps that define character boundaries
        // Format: { segments: [[start, end], [start, end], ...], rows: number }
        // Each character has unique line length and gap patterns for identification
        return {
            // Lowercase letters with distinctive line patterns and gaps
            'a': { segments: [[0, 0.8], [0.2, 1.0]], rows: 2 },           // A - two overlapping lines
            'b': { segments: [[0, 0.6], [0.4, 1.0], [0, 0.3]], rows: 3 }, // B - three segments, decreasing
            'c': { segments: [[0.1, 0.9]], rows: 1 },                     // C - single curved line
            'd': { segments: [[0, 0.7], [0.3, 1.0]], rows: 2 },           // D - two overlapping segments
            'e': { segments: [[0, 0.8], [0, 0.5], [0, 0.8]], rows: 3 },   // E - three horizontal lines
            'f': { segments: [[0, 0.8], [0, 0.5]], rows: 2 },             // F - two lines, top longer
            'g': { segments: [[0.1, 0.9], [0, 0.4], [0.6, 1.0]], rows: 3 }, // G - opening pattern
            'h': { segments: [[0, 0.3], [0.7, 1.0], [0, 1.0]], rows: 3 }, // H - crossbar pattern
            'i': { segments: [[0.4, 0.6]], rows: 1 },                     // I - short centered line
            'j': { segments: [[0.4, 0.7], [0.3, 0.5]], rows: 2 },         // J - hook pattern
            'k': { segments: [[0, 0.4], [0.3, 0.7], [0.6, 1.0]], rows: 3 }, // K - diagonal suggestion
            'l': { segments: [[0, 0.2]], rows: 1 },                       // L - very short line
            'm': { segments: [[0, 0.3], [0.35, 0.65], [0.7, 1.0]], rows: 3 }, // M - three peaks
            'n': { segments: [[0, 0.4], [0.6, 1.0]], rows: 2 },           // N - two segments
            'o': { segments: [[0.1, 0.9]], rows: 1 },                     // O - centered line with gaps
            'p': { segments: [[0, 0.6], [0, 0.4]], rows: 2 },             // P - two left-aligned
            'q': { segments: [[0.4, 1.0], [0.1, 0.7]], rows: 2 },         // Q - right-aligned with tail
            'r': { segments: [[0, 0.5]], rows: 1 },                       // R - half line
            's': { segments: [[0.1, 0.6], [0.4, 0.9], [0.2, 0.7]], rows: 3 }, // S - wave pattern
            't': { segments: [[0.3, 0.7], [0.2, 0.5]], rows: 2 },         // T - cross pattern
            'u': { segments: [[0, 0.4], [0.6, 1.0]], rows: 2 },           // U - two segments with gap
            'v': { segments: [[0, 0.4], [0.6, 1.0]], rows: 2 },           // V - similar to U
            'w': { segments: [[0, 0.25], [0.35, 0.65], [0.75, 1.0]], rows: 3 }, // W - three segments
            'x': { segments: [[0, 0.4], [0.6, 1.0], [0.2, 0.8]], rows: 3 }, // X - crossing pattern
            'y': { segments: [[0, 0.4], [0.6, 1.0]], rows: 2 },           // Y - fork pattern
            'z': { segments: [[0, 0.8], [0.2, 1.0], [0, 0.6]], rows: 3 }, // Z - zigzag
            
            // Uppercase variants with longer, more dramatic lines
            'A': { segments: [[0, 0.9], [0.1, 1.0]], rows: 2 },           // Longer A
            'B': { segments: [[0, 0.7], [0.3, 1.0], [0, 0.4]], rows: 3 }, // Extended B
            'C': { segments: [[0.05, 0.95]], rows: 1 },                   // Longer C
            'D': { segments: [[0, 0.8], [0.2, 1.0]], rows: 2 },           // Extended D
            'E': { segments: [[0, 0.9], [0, 0.6], [0, 0.9]], rows: 3 },   // Extended E
            'F': { segments: [[0, 0.9], [0, 0.6]], rows: 2 },             // Extended F
            'G': { segments: [[0.05, 0.95], [0, 0.5], [0.5, 1.0]], rows: 3 }, // Extended G
            'H': { segments: [[0, 0.4], [0.6, 1.0], [0, 1.0]], rows: 3 }, // Extended H
            'I': { segments: [[0.3, 0.7]], rows: 1 },                     // Longer I
            'J': { segments: [[0.3, 0.8], [0.2, 0.6]], rows: 2 },         // Extended J
            'K': { segments: [[0, 0.5], [0.25, 0.75], [0.5, 1.0]], rows: 3 }, // Extended K
            'L': { segments: [[0, 0.3]], rows: 1 },                       // Longer L
            'M': { segments: [[0, 0.3], [0.35, 0.65], [0.7, 1.0]], rows: 3 }, // Extended M
            'N': { segments: [[0, 0.5], [0.5, 1.0]], rows: 2 },           // Extended N
            'O': { segments: [[0.05, 0.95]], rows: 1 },                   // Extended O
            'P': { segments: [[0, 0.7], [0, 0.5]], rows: 2 },             // Extended P
            'Q': { segments: [[0.3, 1.0], [0.05, 0.75]], rows: 2 },       // Extended Q
            'R': { segments: [[0, 0.6]], rows: 1 },                       // Extended R
            'S': { segments: [[0.05, 0.7], [0.3, 0.95], [0.1, 0.8]], rows: 3 }, // Extended S
            'T': { segments: [[0.2, 0.8], [0.1, 0.6]], rows: 2 },         // Extended T
            'U': { segments: [[0, 0.5], [0.5, 1.0]], rows: 2 },           // Extended U
            'V': { segments: [[0, 0.5], [0.5, 1.0]], rows: 2 },           // Extended V
            'W': { segments: [[0, 0.3], [0.35, 0.65], [0.7, 1.0]], rows: 3 }, // Extended W
            'X': { segments: [[0, 0.5], [0.5, 1.0], [0.15, 0.85]], rows: 3 }, // Extended X
            'Y': { segments: [[0, 0.5], [0.5, 1.0]], rows: 2 },           // Extended Y
            'Z': { segments: [[0, 0.9], [0.1, 1.0], [0, 0.7]], rows: 3 }, // Extended Z
            
            // Numbers with unique patterns
            '0': { segments: [[0.1, 0.9]], rows: 1 },                     // Oval suggestion
            '1': { segments: [[0.45, 0.55]], rows: 1 },                   // Thin centered line
            '2': { segments: [[0, 0.6], [0.4, 1.0]], rows: 2 },           // 2 pattern
            '3': { segments: [[0.2, 0.8], [0.4, 1.0]], rows: 2 },         // 3 pattern
            '4': { segments: [[0, 0.3], [0.7, 1.0]], rows: 2 },           // 4 pattern
            '5': { segments: [[0, 0.5], [0.5, 1.0]], rows: 2 },           // 5 pattern
            '6': { segments: [[0.1, 0.7]], rows: 1 },                     // 6 curve
            '7': { segments: [[0.3, 1.0], [0, 0.4]], rows: 2 },           // 7 angle
            '8': { segments: [[0.2, 0.8]], rows: 1 },                     // 8 center line
            '9': { segments: [[0.3, 0.9]], rows: 1 },                     // 9 pattern
            
            // Punctuation with minimal patterns
            '.': { segments: [[0.48, 0.52]], rows: 1 },                   // Tiny dot
            ',': { segments: [[0.45, 0.55]], rows: 1 },                   // Tiny comma
            '?': { segments: [[0.2, 0.7], [0.48, 0.52]], rows: 2 },       // Question pattern
            '!': { segments: [[0.48, 0.52], [0.47, 0.53]], rows: 2 },     // Exclamation
            ':': { segments: [[0.47, 0.53], [0.47, 0.53]], rows: 2 },     // Double dots
            ';': { segments: [[0.47, 0.53], [0.45, 0.55]], rows: 2 },     // Semicolon
            
            ' ': { segments: [], rows: 0 }                              // Space - empty
        };
    }

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
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockSize = 12; // Fixed optimal size
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
        this.updateSvgBackground(); // Apply background setting

        this.updateDecodingGuide(chars, 'horizontal', patterns);
    }

    generateKvarV(text) {
        const patterns = this.getVerticalPatterns();
        const chars = text.toLowerCase().split('');
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockSize = 12; // Fixed optimal size
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
        this.updateSvgBackground(); // Apply background setting

        this.updateDecodingGuide(chars, 'vertical', this.getVerticalPatterns());
    }

    generateKvarSQ(text) {
        const patterns = this.getSquarePatterns();
        const chars = text.toLowerCase().split('');
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockSize = 15; // Fixed optimal size
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
        this.updateSvgBackground(); // Apply background setting

        this.updateDecodingGuide(chars, 'square', this.getSquarePatterns());
    }

    generateEpetri(text) {
        const patterns = this.getEpetriPatterns();
        const chars = text.split(''); // Keep original case for uppercase variants
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        
        // Epetri-specific settings
        const weight = this.epetriWeightSelect.value;
        const form = this.epetriFormSelect.value;
        const showIndex = this.epetriIndexToggle.checked;
        
        // Weight affects line width
        const weightMultiplier = {
            'anorexic-1': 0.3,
            'anorexic-2': 0.4,
            'anorexic-3': 0.5,
            'regular-1': 0.7,
            'regular-2': 0.8,
            'bold-1': 1.0,
            'bold-2': 1.2
        }[weight] || 0.7;
        
        // Form affects spacing and character width
        const formMultiplier = form === 'airy' ? 1.5 : 1.0;
        const blockWidth = 4 * formMultiplier; // Fixed optimal size
        const baseHeight = 50; // Fixed optimal height
        const spacing = biometric ? blockWidth * 0.05 : blockWidth * 0.3;

        let svgContent = '';
        let currentX = 0;
        let maxHeight = 0;

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char.toLowerCase()] || patterns[char] || patterns[' '];
            if (!Array.isArray(pattern)) return;

            // Calculate glyph width
            const glyphWidth = pattern.length * blockWidth;
            
            pattern.forEach((segment, segIndex) => {
                if (segment > 0) {
                    const x = currentX + (segIndex * blockWidth);
                    
                    // Improved height mapping: 1=25%, 2=60%, 3=100%
                    const heightRatio = segment === 1 ? 0.25 : segment === 2 ? 0.60 : 1.0;
                    const height = baseHeight * heightRatio;
                    const y = baseHeight - height;
                    
                    // Weight-adjusted line width
                    const lineWidth = blockWidth * 0.8 * weightMultiplier;
                    const lineX = x + (blockWidth - lineWidth) / 2;
                    
                    // Add subtle rounded tops for better aesthetics
                    const roundness = lineWidth * 0.1;
                    svgContent += `<rect x="${lineX}" y="${y}" width="${lineWidth}" height="${height}" fill="${color}" rx="${roundness}"/>`;
                    
                    // Add index line if enabled (thin line at beginning of each glyph)
                    if (showIndex && segIndex === 0) {
                        const indexLineX = currentX - 1;
                        const indexHeight = baseHeight * 0.15;
                        const indexY = baseHeight - indexHeight;
                        svgContent += `<rect x="${indexLineX}" y="${indexY}" width="1" height="${indexHeight}" fill="${color}" opacity="0.6"/>`;
                    }
                    
                    maxHeight = Math.max(maxHeight, baseHeight);
                }
            });

            // Character spacing - closer in biometric mode for waveform continuity
            currentX += glyphWidth + spacing;
            
            // Add subtle separator between words in biometric mode
            if (biometric && char === ' ' && charIndex < chars.length - 1) {
                currentX += spacing * 2;
            }
        });

        const totalWidth = Math.max(currentX - spacing, 100);
        this.outputSvg.setAttribute('viewBox', `0 0 ${totalWidth} ${baseHeight}`);
        this.outputSvg.innerHTML = svgContent;
        this.updateSvgBackground(); // Apply background setting

        this.updateDecodingGuide(chars.map(c => c.toLowerCase()), 'epetri', patterns);
    }

    generateMidisH(text) {
        const patterns = this.getMidisHPatterns();
        const chars = text.split(''); // Preserve case for uppercase variants
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockSize = 12; // Fixed optimal size
        const rectHeight = blockSize * 0.7; // Rectangle height (horizontal emphasis)
        const spacing = biometric ? blockSize * 0.05 : blockSize * 0.3;

        let svgContent = '';
        let currentX = 0;
        let maxHeight = 0;

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char.toLowerCase()] || patterns[char] || patterns[' '];
            if (!Array.isArray(pattern)) return;

            const charHeight = pattern.length * blockSize;
            const charWidth = Math.max(...pattern.map(row => Array.isArray(row) ? row.length : 0)) * blockSize;
            maxHeight = Math.max(maxHeight, charHeight);
            
            // Draw pattern with proper diagonal spacing visualization
            pattern.forEach((row, rowIndex) => {
                if (Array.isArray(row)) {
                    row.forEach((cell, colIndex) => {
                        if (cell === 1) {
                            const x = currentX + (colIndex * blockSize);
                            const y = rowIndex * blockSize + (blockSize - rectHeight) / 2;
                            
                            // Add subtle rounded corners for better aesthetic
                            const roundness = rectHeight * 0.1;
                            svgContent += `<rect x="${x}" y="${y}" width="${blockSize * 0.9}" height="${rectHeight}" fill="${color}" rx="${roundness}"/>`;
                            
                            // Add visual connection hints in biometric mode (subtle lines between diagonal elements)
                            if (biometric && rowIndex < pattern.length - 1) {
                                const nextRow = pattern[rowIndex + 1];
                                if (Array.isArray(nextRow)) {
                                    // Look for diagonal connections
                                    const leftDiagonal = colIndex > 0 && nextRow[colIndex - 1] === 1;
                                    const rightDiagonal = colIndex < nextRow.length - 1 && nextRow[colIndex + 1] === 1;
                                    
                                    if (leftDiagonal || rightDiagonal) {
                                        const connectY = y + rectHeight;
                                        const connectHeight = blockSize - rectHeight;
                                        const connectX = x + blockSize * 0.45;
                                        const connectWidth = blockSize * 0.1;
                                        
                                        svgContent += `<rect x="${connectX}" y="${connectY}" width="${connectWidth}" height="${connectHeight * 0.3}" fill="${color}" opacity="0.3"/>`;
                                    }
                                }
                            }
                        }
                    });
                }
            });

            currentX += charWidth + spacing;
            
            // Add subtle glyph separators in biometric mode
            if (biometric && char === ' ' && charIndex < chars.length - 1) {
                currentX += spacing;
            }
        });

        const totalWidth = Math.max(currentX - spacing, 100);
        const totalHeight = Math.max(maxHeight, 60);
        this.outputSvg.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);
        this.outputSvg.innerHTML = svgContent;
        this.updateSvgBackground(); // Apply background setting

        this.updateDecodingGuide(chars.map(c => c.toLowerCase()), 'midis-h', patterns);
    }

    generateMidisV(text) {
        const patterns = this.getMidisVPatterns();
        const chars = text.split(''); // Preserve case for uppercase variants
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        const blockWidth = 8; // Fixed optimal size
        const baseHeight = 45; // Fixed optimal height
        const spacing = biometric ? blockWidth * 0.1 : blockWidth * 0.4;

        let svgContent = '';
        let currentX = 0;
        let maxHeight = 0;

        chars.forEach((char, charIndex) => {
            const pattern = patterns[char.toLowerCase()] || patterns[char] || patterns[' '];
            if (!Array.isArray(pattern)) return;

            const segments = pattern.length;
            const segmentSpacing = baseHeight / Math.max(segments, 1);

            pattern.forEach((segment, segIndex) => {
                if (segment > 0) {
                    const x = currentX;
                    
                    // Height mapping: 1=30%, 2=60%, 3=100%
                    const heightRatio = segment === 1 ? 0.3 : segment === 2 ? 0.6 : 1.0;
                    const segmentHeight = baseHeight * heightRatio;
                    
                    // Positioning: distribute segments vertically within character space
                    const y = (segIndex * segmentSpacing) + (segmentSpacing - segmentHeight) / 2;
                    
                    // Width slightly smaller than blockWidth for visual separation
                    const rectWidth = blockWidth * 0.85;
                    const rectX = x + (blockWidth - rectWidth) / 2;
                    
                    // Add subtle rounded corners
                    const roundness = rectWidth * 0.1;
                    svgContent += `<rect x="${rectX}" y="${y}" width="${rectWidth}" height="${segmentHeight}" fill="${color}" rx="${roundness}"/>`;
                    
                    maxHeight = Math.max(maxHeight, y + segmentHeight);
                }
            });

            // Add subtle baseline indicators in biometric mode
            if (biometric && segments > 1) {
                const baselineY = baseHeight - 2;
                const baselineWidth = blockWidth * 0.3;
                const baselineX = currentX + (blockWidth - baselineWidth) / 2;
                svgContent += `<rect x="${baselineX}" y="${baselineY}" width="${baselineWidth}" height="1" fill="${color}" opacity="0.2"/>`;
            }

            currentX += blockWidth + spacing;
            
            // Extra spacing for word boundaries in biometric mode
            if (biometric && char === ' ' && charIndex < chars.length - 1) {
                currentX += spacing * 1.5;
            }
        });

        const totalWidth = Math.max(currentX - spacing, 100);
        const totalHeight = Math.max(maxHeight, baseHeight);
        this.outputSvg.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);
        this.outputSvg.innerHTML = svgContent;
        this.updateSvgBackground(); // Apply background setting

        this.updateDecodingGuide(chars.map(c => c.toLowerCase()), 'midis-v', patterns);
    }

    generateRicetta(text) {
        const patterns = this.getRicettaPatterns();
        const chars = text.split(''); // Preserve case for uppercase variants
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        
        // Ricetta-specific settings
        const weight = this.ricettaWeightSelect.value;
        const orientation = this.ricettaOrientationSelect.value;
        const keepSpaces = this.ricettaSpacingToggle.checked;
        
        // Weight affects line thickness
        const weightMultiplier = {
            'normal': 1.0,
            'semibold': 1.4,
            'bold': 1.8,
            'pixel-crack': 0.5
        }[weight] || 1.0;
        
        // Ricetta-specific parameters for extremely stretched lines
        const lineThickness = 8 * weightMultiplier; // Fixed optimal base size
        const maxDimension = 200; // Fixed optimal dimension
        const elementSpacing = lineThickness * 1.8; // Spacing between elements
        const charSpacing = biometric ? elementSpacing * 0.5 : elementSpacing * (keepSpaces ? 2.5 : 0.3);

        let svgContent = '';
        let currentPos = 0; // Current position (Y for horizontal, X for vertical)
        let maxUsedDimension = 0; // Max used dimension (width for horizontal, height for vertical)
        
        if (orientation === 'horizontal') {
            // Horizontal orientation (original Ricetta concept)
            chars.forEach((char, charIndex) => {
                const pattern = patterns[char.toLowerCase()] || patterns[char] || patterns[' '];
                if (!pattern || !pattern.segments) {
                    currentPos += charSpacing * 0.5;
                    return;
                }

                const { segments, rows } = pattern;
                
                if (segments.length === 0) {
                    currentPos += charSpacing * (keepSpaces ? 0.3 : 0.1);
                    return;
                }

                // Draw horizontal segments
                segments.forEach((segment, segIndex) => {
                    const [start, end] = segment;
                    const x = start * maxDimension;
                    const width = (end - start) * maxDimension;
                    const y = currentPos + (segIndex * elementSpacing);
                    
                    const roundness = lineThickness * 0.2;
                    svgContent += `<rect x="${x}" y="${y}" width="${width}" height="${lineThickness}" fill="${color}" rx="${roundness}"/>`;
                    
                    maxUsedDimension = Math.max(maxUsedDimension, x + width);
                });

                currentPos += (rows * elementSpacing) + charSpacing;
                
                // Character boundary indicators
                if (biometric && charIndex < chars.length - 1 && segments.length > 0 && keepSpaces) {
                    const gapY = currentPos - charSpacing * 0.3;
                    const gapWidth = maxDimension * 0.05;
                    const gapX = maxDimension * 0.02;
                    svgContent += `<rect x="${gapX}" y="${gapY}" width="${gapWidth}" height="${lineThickness * 0.3}" fill="${color}" opacity="0.2"/>`;
                }
                
                if (char === ' ' && charIndex < chars.length - 1) {
                    currentPos += charSpacing * 0.5;
                }
            });
            
            const totalHeight = Math.max(currentPos - charSpacing, 60);
            const totalWidth = Math.max(maxUsedDimension, maxDimension);
            this.outputSvg.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);
            
        } else {
            // Vertical orientation (90-degree rotation of concept)
            chars.forEach((char, charIndex) => {
                const pattern = patterns[char.toLowerCase()] || patterns[char] || patterns[' '];
                if (!pattern || !pattern.segments) {
                    currentPos += charSpacing * 0.5;
                    return;
                }

                const { segments, rows } = pattern;
                
                if (segments.length === 0) {
                    currentPos += charSpacing * (keepSpaces ? 0.3 : 0.1);
                    return;
                }

                // Draw vertical segments (rotated horizontal concept)
                segments.forEach((segment, segIndex) => {
                    const [start, end] = segment;
                    const y = start * maxDimension;
                    const height = (end - start) * maxDimension;
                    const x = currentPos + (segIndex * elementSpacing);
                    
                    const roundness = lineThickness * 0.2;
                    svgContent += `<rect x="${x}" y="${y}" width="${lineThickness}" height="${height}" fill="${color}" rx="${roundness}"/>`;
                    
                    maxUsedDimension = Math.max(maxUsedDimension, y + height);
                });

                currentPos += (rows * elementSpacing) + charSpacing;
                
                // Character boundary indicators for vertical
                if (biometric && charIndex < chars.length - 1 && segments.length > 0 && keepSpaces) {
                    const gapX = currentPos - charSpacing * 0.3;
                    const gapHeight = maxDimension * 0.05;
                    const gapY = maxDimension * 0.02;
                    svgContent += `<rect x="${gapX}" y="${gapY}" width="${lineThickness * 0.3}" height="${gapHeight}" fill="${color}" opacity="0.2"/>`;
                }
                
                if (char === ' ' && charIndex < chars.length - 1) {
                    currentPos += charSpacing * 0.5;
                }
            });
            
            const totalWidth = Math.max(currentPos - charSpacing, 60);
            const totalHeight = Math.max(maxUsedDimension, maxDimension);
            this.outputSvg.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);
        }
        
        this.outputSvg.innerHTML = svgContent;
        this.updateSvgBackground(); // Apply background setting
        
        this.updateDecodingGuide(chars.map(c => c.toLowerCase()), 'ricetta', patterns);
    }

    generateVitkovacH(text) {
        const patterns = this.getVitkovacHPatterns();
        const chars = text.toLowerCase().split('');
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
        
        const blockSize = 10; // Fixed optimal size
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
        this.updateSvgBackground(); // Apply background setting

        this.updateDecodingGuide(text.split(''), 'vitkovac-h', this.getVitkovacHPatterns());
    }

    generateVitkovacV(text) {
        const patterns = this.getVitkovacVPatterns();
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
        
        const blockSize = 10; // Fixed optimal size
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
        this.updateSvgBackground(); // Apply background setting

        this.updateDecodingGuide(columns.join('').split(''), 'vitkovac-v', this.getVitkovacVPatterns());
    }

    generateVisualPoetry(text) {
        const mode = this.poetryModeSelect.value;
        const spacingIntensity = parseInt(this.spacingIntensity.value);
        const rotationVariance = parseInt(this.rotationVariance.value);
        const scaleVariance = parseInt(this.scaleVariance.value);
        const layerOpacity = parseInt(this.layerOpacity.value) / 100;
        const semanticSpacing = this.semanticSpacing.checked;
        const wordBreaking = this.wordBreaking.checked;
        const color = this.colorPicker.value;
        const biometric = this.biometricToggle.checked;
        
        // Fixed canvas dimensions for consistent layout
        const canvasWidth = 1200;
        const canvasHeight = 800;
        
        let svgContent = '';
        
        // Parse text into lines for multi-line poetry
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        if (lines.length === 0) lines.push('visual poetry');
        
        switch (mode) {
            case 'scattered':
                svgContent = this.generateScatteredComposition(lines, {
                    canvasWidth, canvasHeight, spacingIntensity, rotationVariance, 
                    scaleVariance, color, biometric, wordBreaking
                });
                break;
            case 'layered':
                svgContent = this.generateLayeredComposition(lines, {
                    canvasWidth, canvasHeight, layerOpacity, scaleVariance, 
                    color, biometric
                });
                break;
            case 'curved':
                svgContent = this.generateCurvedComposition(lines, {
                    canvasWidth, canvasHeight, spacingIntensity, color, biometric
                });
                break;
            case 'spiral':
                svgContent = this.generateSpiralComposition(lines, {
                    canvasWidth, canvasHeight, spacingIntensity, color, biometric
                });
                break;
            case 'concrete':
                svgContent = this.generateConcreteComposition(lines, {
                    canvasWidth, canvasHeight, semanticSpacing, color, biometric
                });
                break;
            case 'template':
                const templateType = this.templateSelect.value;
                svgContent = this.generateTemplateComposition(lines, templateType, {
                    canvasWidth, canvasHeight, color, biometric, spacingIntensity, scaleVariance
                });
                break;
            default:
                svgContent = this.generateScatteredComposition(lines, {
                    canvasWidth, canvasHeight, spacingIntensity, rotationVariance, 
                    scaleVariance, color, biometric, wordBreaking
                });
        }
        
        // Set up SVG with consistent sizing
        this.setupPoetryCanvas(svgContent, canvasWidth, canvasHeight);
        
        // Update decoding guide for visual poetry
        this.updateDecodingGuide(text.split(/\s+/).filter(w => w.length > 0), 'visual-poetry', { mode, lines: lines.length });
    }

    setupPoetryCanvas(svgContent, canvasWidth, canvasHeight) {
        // Add consistent margins to prevent clipping and ensure centering
        const margin = 100; // 100px margin on all sides
        const safeWidth = canvasWidth - (margin * 2);
        const safeHeight = canvasHeight - (margin * 2);
        
        // Wrap content in a group with margin offset for safety
        const centeredContent = `<g transform="translate(${margin}, ${margin})">${svgContent}</g>`;
        
        this.poetrySvg.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`);
        this.poetrySvg.setAttribute('width', canvasWidth);
        this.poetrySvg.setAttribute('height', canvasHeight);
        this.poetrySvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        this.poetrySvg.innerHTML = centeredContent;
        this.updateSvgBackground(); // Apply background setting
    }

    generateScatteredComposition(lines, options) {
        const { canvasWidth, canvasHeight, spacingIntensity, rotationVariance, scaleVariance, color, biometric, wordBreaking } = options;
        let svgContent = '';
        
        // Use seeded random for consistent results
        const seedRandom = this.createSeededRandom(lines.join('').length);
        
        // Use safe area within the canvas (excluding margins that will be added)
        const safeMargin = 100; // This matches the margin in setupPoetryCanvas
        const safeWidth = canvasWidth - (safeMargin * 2);
        const safeHeight = canvasHeight - (safeMargin * 2);
        
        const baseSize = 24;
        const minScale = 0.8;
        const maxScale = 1 + (scaleVariance / 100);
        
        lines.forEach((line, lineIndex) => {
            const words = wordBreaking ? line.split('') : line.split(/\s+/);
            
            words.forEach((word, wordIndex) => {
                if (!word.trim()) return;
                
                // Random positioning within safe area
                const innerMargin = safeWidth * 0.05; // Small inner margin
                const effectiveWidth = safeWidth - (innerMargin * 2);
                const effectiveHeight = safeHeight - (innerMargin * 2);
                
                let x, y;
                
                if (biometric) {
                    // Biometric mode: more organic, flowing placement
                    const flowAngle = (lineIndex * Math.PI / 4) + (wordIndex * 0.3);
                    const radius = (effectiveWidth / 4) + (seedRandom() * spacingIntensity * 20);
                    x = innerMargin + (effectiveWidth / 2) + Math.cos(flowAngle) * radius;
                    y = innerMargin + (effectiveHeight / 2) + Math.sin(flowAngle) * radius * 0.6;
                } else {
                    // Standard mode: more random placement influenced by spacing intensity
                    x = innerMargin + (seedRandom() * effectiveWidth);
                    y = innerMargin + (seedRandom() * effectiveHeight);
                }
                
                // Ensure text stays within safe area
                x = Math.max(innerMargin, Math.min(x, safeWidth - innerMargin));
                y = Math.max(innerMargin, Math.min(y, safeHeight - innerMargin));
                
                // Random rotation
                const rotation = (seedRandom() - 0.5) * 2 * rotationVariance;
                
                // Random scale
                const scale = minScale + (seedRandom() * (maxScale - minScale));
                const fontSize = baseSize * scale;
                
                // Generate text using the selected base font
                const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
                
                // Apply transforms
                const transform = `translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`;
                
                svgContent += `<g transform="${transform}">${wordSvg}</g>`;
            });
        });
        
        return svgContent;
    }

    generateWordWithBaseFont(word, color, fontSize) {
        // Use the selected font for visual poetry
        const selectedFont = this.poetryFontSelect ? this.poetryFontSelect.value : 'epetri';
        const chars = word.split('');
        
        let svgContent = '';
        let currentX = 0;
        
        switch (selectedFont) {
            case 'epetri':
                return this.generateEpetriWord(word, color, fontSize);
            case 'kvar-h-brut':
            case 'kvar-h-tite':
                return this.generateKvarHWord(word, color, fontSize, selectedFont.split('-')[2]);
            case 'kvar-v':
                return this.generateKvarVWord(word, color, fontSize);
            case 'kvar-sq':
                return this.generateKvarSQWord(word, color, fontSize);
            case 'midis-h':
                return this.generateMidisHWord(word, color, fontSize);
            case 'midis-v':
                return this.generateMidisVWord(word, color, fontSize);
            case 'ricetta':
                return this.generateRicettaWord(word, color, fontSize);
            default:
                return this.generateEpetriWord(word, color, fontSize);
        }
    }

    generateEpetriWord(word, color, fontSize) {
        const patterns = this.getEpetriPatterns();
        const chars = word.split('');
        
        let svgContent = '';
        let currentX = 0;
        const blockWidth = fontSize * 0.15;
        const baseHeight = fontSize;
        
        chars.forEach((char) => {
            const pattern = patterns[char.toLowerCase()] || patterns[char] || patterns[' '];
            if (!Array.isArray(pattern)) return;
            
            pattern.forEach((segment, segIndex) => {
                if (segment > 0) {
                    const x = currentX + (segIndex * blockWidth);
                    
                    // Height mapping: 1=25%, 2=60%, 3=100%
                    const heightRatio = segment === 1 ? 0.25 : segment === 2 ? 0.60 : 1.0;
                    const height = baseHeight * heightRatio;
                    const y = baseHeight - height;
                    
                    const lineWidth = blockWidth * 0.8;
                    const lineX = x + (blockWidth - lineWidth) / 2;
                    
                    svgContent += `<rect x="${lineX}" y="${y}" width="${lineWidth}" height="${height}" fill="${color}"/>`;
                }
            });
            
            currentX += pattern.length * blockWidth + (blockWidth * 0.2);
        });
        
        return svgContent;
    }

    generateKvarHWord(word, color, fontSize, style = 'brut') {
        const patterns = this.getCharacterPatterns()[`kvar-h-${style}`] || this.getCharacterPatterns()['kvar-h-brut'];
        const chars = word.toLowerCase().split('');
        
        let svgContent = '';
        let currentX = 0;
        const blockSize = fontSize * 0.6;
        
        chars.forEach((char) => {
            const pattern = patterns[char] || patterns[' '];
            if (!pattern) return;
            
            pattern.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell === 1) {
                        const x = currentX + (colIndex * blockSize);
                        const y = rowIndex * blockSize;
                        svgContent += `<rect x="${x}" y="${y}" width="${blockSize}" height="${blockSize}" fill="${color}"/>`;
                    }
                });
            });
            
            currentX += (pattern[0].length * blockSize) + (blockSize * 0.2);
        });
        
        return svgContent;
    }

    generateKvarVWord(word, color, fontSize) {
        const patterns = this.getVerticalPatterns();
        const chars = word.toLowerCase().split('');
        
        let svgContent = '';
        let currentX = 0;
        const blockSize = fontSize * 0.6;
        const lineHeight = blockSize * 1.2;
        
        chars.forEach((char) => {
            const pattern = patterns[char] || patterns[' '];
            if (!pattern) return;
            
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
            
            currentX += blockSize + (blockSize * 0.2);
        });
        
        return svgContent;
    }

    generateKvarSQWord(word, color, fontSize) {
        const patterns = this.getSquarePatterns();
        const chars = word.toLowerCase().split('');
        
        let svgContent = '';
        let currentX = 0;
        const blockSize = fontSize * 0.6;
        
        chars.forEach((char) => {
            const pattern = patterns[char] || patterns[' '];
            if (!pattern || !Array.isArray(pattern)) return;
            
            pattern.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell === 1) {
                        const x = currentX + (colIndex * blockSize);
                        const y = rowIndex * blockSize;
                        svgContent += `<rect x="${x}" y="${y}" width="${blockSize}" height="${blockSize}" fill="${color}"/>`;
                    }
                });
            });
            
            currentX += (pattern[0].length * blockSize) + (blockSize * 0.2);
        });
        
        return svgContent;
    }

    generateMidisHWord(word, color, fontSize) {
        const patterns = this.getMidisHPatterns();
        const chars = word.split('');
        
        let svgContent = '';
        let currentX = 0;
        const blockSize = fontSize * 0.5;
        const rectHeight = blockSize * 0.7;
        
        chars.forEach((char) => {
            const pattern = patterns[char.toLowerCase()] || patterns[char] || patterns[' '];
            if (!Array.isArray(pattern)) return;
            
            pattern.forEach((row, rowIndex) => {
                if (Array.isArray(row)) {
                    row.forEach((cell, colIndex) => {
                        if (cell === 1) {
                            const x = currentX + (colIndex * blockSize);
                            const y = rowIndex * blockSize + (blockSize - rectHeight) / 2;
                            const roundness = rectHeight * 0.1;
                            svgContent += `<rect x="${x}" y="${y}" width="${blockSize * 0.9}" height="${rectHeight}" fill="${color}" rx="${roundness}"/>`;
                        }
                    });
                }
            });
            
            const charWidth = Math.max(...pattern.map(row => Array.isArray(row) ? row.length : 0)) * blockSize;
            currentX += charWidth + (blockSize * 0.2);
        });
        
        return svgContent;
    }

    generateMidisVWord(word, color, fontSize) {
        const patterns = this.getMidisVPatterns();
        const chars = word.split('');
        
        let svgContent = '';
        let currentX = 0;
        const blockWidth = fontSize * 0.4;
        const baseHeight = fontSize;
        
        chars.forEach((char) => {
            const pattern = patterns[char.toLowerCase()] || patterns[char] || patterns[' '];
            if (!Array.isArray(pattern)) return;
            
            pattern.forEach((segment, segIndex) => {
                if (segment > 0) {
                    const x = currentX;
                    const heightRatio = segment === 1 ? 0.3 : segment === 2 ? 0.6 : 1.0;
                    const segmentHeight = baseHeight * heightRatio;
                    const y = baseHeight - segmentHeight;
                    
                    const rectWidth = blockWidth * 0.85;
                    const rectX = x + (blockWidth - rectWidth) / 2;
                    const roundness = rectWidth * 0.1;
                    
                    svgContent += `<rect x="${rectX}" y="${y}" width="${rectWidth}" height="${segmentHeight}" fill="${color}" rx="${roundness}"/>`;
                }
            });
            
            currentX += blockWidth + (blockWidth * 0.2);
        });
        
        return svgContent;
    }

    generateRicettaWord(word, color, fontSize) {
        const patterns = this.getRicettaPatterns();
        const chars = word.split('');
        
        let svgContent = '';
        let currentY = 0;
        const lineThickness = fontSize * 0.1;
        const maxDimension = fontSize * 8;
        const elementSpacing = lineThickness * 1.5;
        
        chars.forEach((char) => {
            const pattern = patterns[char.toLowerCase()] || patterns[char] || patterns[' '];
            if (!pattern || !pattern.segments) return;
            
            const { segments, rows } = pattern;
            
            segments.forEach((segment, segIndex) => {
                const [start, end] = segment;
                const x = start * maxDimension;
                const width = (end - start) * maxDimension;
                const y = currentY + (segIndex * elementSpacing);
                
                const roundness = lineThickness * 0.2;
                svgContent += `<rect x="${x}" y="${y}" width="${width}" height="${lineThickness}" fill="${color}" rx="${roundness}"/>`;
            });
            
            currentY += (rows * elementSpacing) + elementSpacing;
        });
        
        return svgContent;
    }

    createSeededRandom(seed) {
        // Simple seeded random number generator for consistent results
        let seedValue = seed;
        return function() {
            seedValue = (seedValue * 9301 + 49297) % 233280;
            return seedValue / 233280;
        };
    }

    generateLayeredComposition(lines, options) {
        const { canvasWidth, canvasHeight, layerOpacity, scaleVariance, color, biometric } = options;
        let svgContent = '';
        
        // Use safe area within the canvas (excluding margins)
        const safeMargin = 100;
        const safeWidth = canvasWidth - (safeMargin * 2);
        const safeHeight = canvasHeight - (safeMargin * 2);
        
        const centerX = safeWidth / 2;
        const centerY = safeHeight / 2;
        const seedRandom = this.createSeededRandom(lines.join('').length);
        
        // Create depth layers with different effects
        lines.forEach((line, lineIndex) => {
            const words = line.split(/\s+/);
            const layerDepth = lineIndex;
            
            // Layer-specific effects
            const baseScale = 1 + (layerDepth * 0.15);
            const layerOpacity_val = Math.max(layerOpacity - (layerDepth * 0.12), 0.15);
            const blur = layerDepth * 0.3; // Depth blur effect
            
            words.forEach((word, wordIndex) => {
                if (!word.trim()) return;
                
                // Position with slight randomness for organic layering
                const offsetX = biometric ? 
                    (seedRandom() - 0.5) * 100 * (layerDepth + 1) : 
                    (seedRandom() - 0.5) * 80;
                const offsetY = biometric ? 
                    (seedRandom() - 0.5) * 60 * (layerDepth + 1) + (layerDepth * 25) : 
                    layerDepth * 40 + (seedRandom() - 0.5) * 30;
                
                // Scale variation within layer
                const scaleVariation = 1 + ((seedRandom() - 0.5) * (scaleVariance / 200));
                const finalScale = baseScale * scaleVariation;
                
                // Generate word with depth-appropriate size
                const fontSize = 28 + (layerDepth * 4);
                const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
                
                // Create shadow/depth effect for back layers
                let shadowEffect = '';
                if (layerDepth > 0) {
                    const shadowOffset = layerDepth * 2;
                    const shadowOpacity = 0.2;
                    const shadowColor = '#666666';
                    
                    shadowEffect = `
                        <g transform="translate(${shadowOffset}, ${shadowOffset})" opacity="${shadowOpacity}">
                            ${this.generateWordWithBaseFont(word, shadowColor, fontSize)}
                        </g>
                    `;
                }
                
                // Apply transforms and effects
                const transform = `translate(${centerX + offsetX}, ${centerY + offsetY}) scale(${finalScale})`;
                const filter = blur > 0 ? `filter: blur(${blur}px);` : '';
                
                svgContent += `
                    <g transform="${transform}" opacity="${layerOpacity_val}" style="${filter}">
                        ${shadowEffect}
                        ${wordSvg}
                    </g>
                `;
            });
        });
        
        return svgContent;
    }

    generateCurvedComposition(lines, options) {
        const { canvasWidth, canvasHeight, spacingIntensity, color, biometric } = options;
        let svgContent = '';
        
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const seedRandom = this.createSeededRandom(lines.join('').length);
        
        lines.forEach((line, lineIndex) => {
            const words = line.split(/\s+/);
            
            if (biometric) {
                // Biometric mode: create flowing, organic curves
                svgContent += this.generateFlowingTextCurve(words, {
                    centerX, centerY, lineIndex, color, seedRandom, canvasWidth, canvasHeight
                });
            } else {
                // Standard mode: geometric curves with distortion effects
                svgContent += this.generateGeometricCurve(words, {
                    centerX, centerY, lineIndex, color, seedRandom, spacingIntensity
                });
            }
        });
        
        return svgContent;
    }

    generateFlowingTextCurve(words, options) {
        const { centerX, centerY, lineIndex, color, seedRandom, canvasWidth, canvasHeight } = options;
        let svgContent = '';
        
        // Create a flowing path for the text
        const pathPoints = [];
        const numPoints = words.length + 3;
        
        for (let i = 0; i < numPoints; i++) {
            const t = i / (numPoints - 1);
            const angle = t * Math.PI * 2 + (lineIndex * Math.PI / 3);
            const radiusVariation = 1 + (seedRandom() - 0.5) * 0.6;
            const baseRadius = (canvasWidth * 0.2) + (lineIndex * 40);
            const radius = baseRadius * radiusVariation;
            
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius * 0.7; // Elliptical
            
            pathPoints.push({ x, y, angle });
        }
        
        // Place words along the flowing curve
        words.forEach((word, wordIndex) => {
            if (!word.trim()) return;
            
            const t = (wordIndex + 1) / (words.length + 1);
            const pointIndex = Math.floor(t * (pathPoints.length - 1));
            const point = pathPoints[pointIndex];
            
            // Calculate rotation to follow curve
            const nextPoint = pathPoints[Math.min(pointIndex + 1, pathPoints.length - 1)];
            const curveAngle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
            const rotation = (curveAngle * 180 / Math.PI);
            
            // Add character-level distortions
            const chars = word.split('');
            let charX = 0;
            
            chars.forEach((char, charIndex) => {
                // Progressive character distortion along the word
                const charDistortion = (charIndex / chars.length) * 0.3;
                const charScale = 1 + (seedRandom() - 0.5) * charDistortion;
                const charRotation = rotation + (seedRandom() - 0.5) * 15 * charDistortion;
                
                const charSvg = this.generateWordWithBaseFont(char, color, 20);
                const charTransform = `translate(${point.x + charX}, ${point.y}) rotate(${charRotation}) scale(${charScale})`;
                
                svgContent += `<g transform="${charTransform}">${charSvg}</g>`;
                
                charX += 15 * charScale; // Advance to next character position
            });
        });
        
        return svgContent;
    }

    generateGeometricCurve(words, options) {
        const { centerX, centerY, lineIndex, color, seedRandom, spacingIntensity } = options;
        let svgContent = '';
        
        const radius = 150 + (lineIndex * 60);
        const angleStep = (Math.PI * 2) / Math.max(words.length, 1);
        
        words.forEach((word, wordIndex) => {
            const angle = wordIndex * angleStep + (lineIndex * Math.PI / 4);
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Perspective distortion effect
            const perspectiveScale = 1 + (Math.sin(angle) * 0.3); // Simulate depth
            const skewX = Math.cos(angle + Math.PI/2) * 10; // Skew based on position
            
            // Size variation based on position and semantic importance
            const baseSize = 18 + (spacingIntensity * 2);
            const sizeVariation = 1 + (seedRandom() - 0.5) * 0.4;
            const fontSize = baseSize * sizeVariation;
            
            // Character-level effects for geometric distortion
            const chars = word.split('');
            let charOffset = 0;
            
            chars.forEach((char, charIndex) => {
                // Wave distortion along the word
                const waveOffset = Math.sin(charIndex * 0.8) * 5;
                const charY = y + waveOffset;
                
                // Progressive scaling within word
                const charScale = perspectiveScale * (0.8 + (charIndex / chars.length) * 0.4);
                
                const rotation = (angle * 180 / Math.PI) + 90;
                const charSvg = this.generateWordWithBaseFont(char, color, fontSize);
                const transform = `translate(${x + charOffset}, ${charY}) rotate(${rotation}) scale(${charScale}) skewX(${skewX})`;
                
                svgContent += `<g transform="${transform}">${charSvg}</g>`;
                
                charOffset += fontSize * 0.6 * charScale;
            });
        });
        
        return svgContent;
    }

    generateSpiralComposition(lines, options) {
        const { canvasWidth, canvasHeight, spacingIntensity, color, biometric } = options;
        let svgContent = '';
        
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const allWords = lines.join(' ').split(/\s+/);
        
        allWords.forEach((word, index) => {
            const angle = index * 0.5;
            const radius = 20 + index * 8;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            const rotation = angle * 180 / Math.PI;
            
            const wordSvg = this.generateWordWithBaseFont(word, color, 20);
            const transform = `translate(${x}, ${y}) rotate(${rotation})`;
            
            svgContent += `<g transform="${transform}">${wordSvg}</g>`;
        });
        
        return svgContent;
    }

    generateConcreteComposition(lines, options) {
        const { canvasWidth, canvasHeight, semanticSpacing, color, biometric } = options;
        let svgContent = '';
        
        if (semanticSpacing) {
            // Semantic-based concrete poem arrangement
            return this.generateSemanticConcreteComposition(lines, options);
        }
        
        // Simple concrete poem: arrange text in a shape (basic implementation)
        const words = lines.join(' ').split(/\s+/);
        const cols = Math.ceil(Math.sqrt(words.length));
        const cellWidth = canvasWidth / cols;
        const cellHeight = canvasHeight / cols;
        
        words.forEach((word, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = col * cellWidth + cellWidth / 2;
            const y = row * cellHeight + cellHeight / 2;
            
            // Create shape-based spacing (simple diamond pattern)
            const centerCol = cols / 2;
            const centerRow = cols / 2;
            const distanceFromCenter = Math.abs(col - centerCol) + Math.abs(row - centerRow);
            
            // Only show words within the diamond shape
            if (distanceFromCenter <= cols / 2) {
                const wordSvg = this.generateWordWithBaseFont(word, color, 18);
                const transform = `translate(${x}, ${y})`;
                svgContent += `<g transform="${transform}">${wordSvg}</g>`;
            }
        });
        
        return svgContent;
    }

    generateSemanticConcreteComposition(lines, options) {
        const { canvasWidth, canvasHeight, color, biometric } = options;
        let svgContent = '';
        
        // Use safe area within the canvas (excluding margins)
        const safeMargin = 100;
        const safeWidth = canvasWidth - (safeMargin * 2);
        const safeHeight = canvasHeight - (safeMargin * 2);
        
        const centerX = safeWidth / 2;
        const centerY = safeHeight / 2;
        
        lines.forEach((line, lineIndex) => {
            const words = this.analyzeSemanticSpacing(line);
            const lineAngle = (lineIndex * Math.PI * 2) / lines.length;
            
            let currentRadius = 100 + lineIndex * 60;
            
            words.forEach((wordData, wordIndex) => {
                const { word, semanticWeight, pauseAfter, emphasis } = wordData;
                
                // Position based on semantic importance and pauses
                const angle = lineAngle + (wordIndex * 0.3);
                const x = centerX + Math.cos(angle) * currentRadius;
                const y = centerY + Math.sin(angle) * currentRadius;
                
                // Size based on semantic weight and emphasis
                const fontSize = 16 + (semanticWeight * 8) + (emphasis ? 6 : 0);
                
                // Generate the word
                const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
                const transform = `translate(${x}, ${y})`;
                
                svgContent += `<g transform="${transform}">${wordSvg}</g>`;
                
                // Adjust radius based on pauses (create visual gaps)
                if (pauseAfter) {
                    currentRadius += pauseAfter * 30; // Create gap
                }
            });
        });
        
        return svgContent;
    }

    analyzeSemanticSpacing(text) {
        const words = text.split(/\s+/);
        const analyzed = [];
        
        // Semantic analysis keywords
        const emphasisWords = ['love', 'death', 'life', 'soul', 'heart', 'dream', 'pain', 'joy', 'hope', 'fear'];
        const pauseMarkers = ['.', ',', ';', ':', '!', '?', '--', '—'];
        
        words.forEach((word, index) => {
            if (!word.trim()) return;
            
            // Clean word for analysis
            const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
            const originalWord = word;
            
            // Determine semantic weight (0-1)
            let semanticWeight = 0.3; // Base weight
            
            // Emphasis words get higher weight
            if (emphasisWords.includes(cleanWord)) {
                semanticWeight = 0.8;
            }
            
            // Longer words get slightly more weight
            if (cleanWord.length > 6) {
                semanticWeight += 0.2;
            }
            
            // Check for emphasis (capitals, exclamation)
            const emphasis = originalWord === originalWord.toUpperCase() || originalWord.includes('!');
            
            // Check for pause after this word
            let pauseAfter = 0;
            pauseMarkers.forEach(marker => {
                if (originalWord.includes(marker)) {
                    switch (marker) {
                        case '.':
                        case '!':
                        case '?':
                            pauseAfter = 3; // Long pause
                            break;
                        case ',':
                        case ';':
                            pauseAfter = 2; // Medium pause
                            break;
                        case ':':
                            pauseAfter = 1.5; // Short pause
                            break;
                        default:
                            pauseAfter = 1; // Minimal pause
                    }
                }
            });
            
            analyzed.push({
                word: originalWord,
                semanticWeight: Math.min(semanticWeight, 1),
                pauseAfter,
                emphasis
            });
        });
        
        return analyzed;
    }

    generateTemplateComposition(lines, templateType, options) {
        const { canvasWidth, canvasHeight, color, biometric, spacingIntensity, scaleVariance } = options;
        
        switch (templateType) {
            case 'falling-words':
                return this.generateFallingWordsTemplate(lines, options);
            case 'heart-shape':
                return this.generateHeartShapeTemplate(lines, options);
            case 'tree-growth':
                return this.generateTreeGrowthTemplate(lines, options);
            case 'wave-motion':
                return this.generateWaveMotionTemplate(lines, options);
            case 'explosion':
                return this.generateExplosionTemplate(lines, options);
            case 'river-flow':
                return this.generateRiverFlowTemplate(lines, options);
            default:
                return this.generateFallingWordsTemplate(lines, options);
        }
    }

    generateFallingWordsTemplate(lines, options) {
        const { canvasWidth, canvasHeight, color, biometric } = options;
        let svgContent = '';
        
        const words = lines.join(' ').split(/\s+/);
        const seedRandom = this.createSeededRandom(words.join('').length);
        
        words.forEach((word, index) => {
            // Create falling/cascading effect
            const x = (canvasWidth * 0.1) + (seedRandom() * canvasWidth * 0.8);
            const y = (canvasHeight * 0.1) + (index * (canvasHeight * 0.8) / words.length);
            
            // Add slight drift as words "fall"
            const drift = biometric ? (seedRandom() - 0.5) * 100 : (seedRandom() - 0.5) * 50;
            const finalX = x + drift;
            
            // Size decreases slightly as words fall
            const fallProgress = index / words.length;
            const fontSize = 28 - (fallProgress * 8);
            
            const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
            const transform = `translate(${finalX}, ${y})`;
            
            svgContent += `<g transform="${transform}">${wordSvg}</g>`;
        });
        
        return svgContent;
    }

    generateHeartShapeTemplate(lines, options) {
        const { canvasWidth, canvasHeight, color, biometric } = options;
        let svgContent = '';
        
        const words = lines.join(' ').split(/\s+/);
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const seedRandom = this.createSeededRandom(words.join('').length);
        
        words.forEach((word, index) => {
            // Heart shape parametric equations
            const t = (index / words.length) * Math.PI * 2;
            const scale = 60;
            
            // Heart shape: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
            const heartX = 16 * Math.pow(Math.sin(t), 3) * scale / 16;
            const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale / 16;
            
            const x = centerX + heartX;
            const y = centerY + heartY;
            
            // Size based on position within heart
            const distanceFromCenter = Math.sqrt(heartX * heartX + heartY * heartY);
            const fontSize = 16 + (distanceFromCenter / 20);
            
            const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
            const transform = `translate(${x}, ${y})`;
            
            svgContent += `<g transform="${transform}">${wordSvg}</g>`;
        });
        
        return svgContent;
    }

    generateTreeGrowthTemplate(lines, options) {
        const { canvasWidth, canvasHeight, color, biometric } = options;
        let svgContent = '';
        
        const words = lines.join(' ').split(/\s+/);
        const centerX = canvasWidth / 2;
        const groundY = canvasHeight * 0.8;
        const seedRandom = this.createSeededRandom(words.join('').length);
        
        words.forEach((word, index) => {
            // Tree structure: trunk, branches, leaves
            const progress = index / words.length;
            
            if (progress < 0.3) {
                // Trunk words
                const y = groundY - (progress * canvasHeight * 0.4);
                const x = centerX + (seedRandom() - 0.5) * 30;
                const fontSize = 20;
                
                const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
                const transform = `translate(${x}, ${y})`;
                svgContent += `<g transform="${transform}">${wordSvg}</g>`;
                
            } else if (progress < 0.7) {
                // Branch words
                const branchProgress = (progress - 0.3) / 0.4;
                const branchAngle = (seedRandom() - 0.5) * Math.PI / 2;
                const branchLength = 80 + branchProgress * 60;
                
                const x = centerX + Math.cos(branchAngle) * branchLength;
                const y = groundY - canvasHeight * 0.3 - branchProgress * canvasHeight * 0.2;
                const fontSize = 18;
                
                const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
                const transform = `translate(${x}, ${y})`;
                svgContent += `<g transform="${transform}">${wordSvg}</g>`;
                
            } else {
                // Leaf words
                const leafProgress = (progress - 0.7) / 0.3;
                const leafAngle = seedRandom() * Math.PI * 2;
                const leafRadius = 40 + leafProgress * 80;
                
                const x = centerX + Math.cos(leafAngle) * leafRadius;
                const y = canvasHeight * 0.3 + Math.sin(leafAngle) * leafRadius * 0.5;
                const fontSize = 14 + leafProgress * 6;
                
                const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
                const transform = `translate(${x}, ${y})`;
                svgContent += `<g transform="${transform}">${wordSvg}</g>`;
            }
        });
        
        return svgContent;
    }

    generateWaveMotionTemplate(lines, options) {
        const { canvasWidth, canvasHeight, color, biometric } = options;
        let svgContent = '';
        
        const words = lines.join(' ').split(/\s+/);
        const seedRandom = this.createSeededRandom(words.join('').length);
        
        words.forEach((word, index) => {
            // Create wave motion across canvas
            const progress = index / words.length;
            const x = canvasWidth * 0.1 + (progress * canvasWidth * 0.8);
            
            // Multiple wave frequencies for complex motion
            const wave1 = Math.sin(progress * Math.PI * 4) * 80;
            const wave2 = Math.sin(progress * Math.PI * 8) * 30;
            const wave3 = Math.sin(progress * Math.PI * 12) * 15;
            
            const y = (canvasHeight / 2) + wave1 + wave2 + wave3;
            
            // Size oscillates with wave motion
            const sizeWave = Math.sin(progress * Math.PI * 6);
            const fontSize = 18 + (sizeWave * 8);
            
            // Rotation follows wave direction
            const rotation = Math.atan2(wave1 + wave2, canvasWidth / words.length) * 180 / Math.PI;
            
            const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
            const transform = `translate(${x}, ${y}) rotate(${rotation})`;
            
            svgContent += `<g transform="${transform}">${wordSvg}</g>`;
        });
        
        return svgContent;
    }

    generateExplosionTemplate(lines, options) {
        const { canvasWidth, canvasHeight, color, biometric } = options;
        let svgContent = '';
        
        const words = lines.join(' ').split(/\s+/);
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const seedRandom = this.createSeededRandom(words.join('').length);
        
        words.forEach((word, index) => {
            // Explosion/burst from center
            const angle = (index / words.length) * Math.PI * 2 + (seedRandom() - 0.5) * 0.5;
            const explosionRadius = (index / words.length) * Math.min(canvasWidth, canvasHeight) * 0.4;
            
            const x = centerX + Math.cos(angle) * explosionRadius;
            const y = centerY + Math.sin(angle) * explosionRadius;
            
            // Size decreases with distance from center
            const distanceFactor = 1 - (explosionRadius / (Math.min(canvasWidth, canvasHeight) * 0.4));
            const fontSize = 12 + (distanceFactor * 16);
            
            // Rotation radiates outward
            const rotation = angle * 180 / Math.PI;
            
            const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
            const transform = `translate(${x}, ${y}) rotate(${rotation})`;
            
            svgContent += `<g transform="${transform}">${wordSvg}</g>`;
        });
        
        return svgContent;
    }

    generateRiverFlowTemplate(lines, options) {
        const { canvasWidth, canvasHeight, color, biometric } = options;
        let svgContent = '';
        
        const words = lines.join(' ').split(/\s+/);
        const seedRandom = this.createSeededRandom(words.join('').length);
        
        words.forEach((word, index) => {
            // River-like flowing path
            const progress = index / words.length;
            
            // S-curve path like a meandering river
            const baseX = canvasWidth * 0.1 + (progress * canvasWidth * 0.8);
            const meander = Math.sin(progress * Math.PI * 3) * (canvasWidth * 0.15);
            const x = baseX + meander;
            
            // Slight vertical flow
            const flowY = Math.sin(progress * Math.PI * 2) * 20;
            const y = (canvasHeight / 2) + flowY;
            
            // Add randomness for natural flow
            const naturalX = x + (seedRandom() - 0.5) * 40;
            const naturalY = y + (seedRandom() - 0.5) * 30;
            
            // Size varies along the flow
            const flowIntensity = Math.abs(Math.sin(progress * Math.PI * 4));
            const fontSize = 16 + (flowIntensity * 12);
            
            // Rotation follows flow direction
            const flowDirection = Math.cos(progress * Math.PI * 3) * Math.PI / 8;
            const rotation = flowDirection * 180 / Math.PI;
            
            const wordSvg = this.generateWordWithBaseFont(word, color, fontSize);
            const transform = `translate(${naturalX}, ${naturalY}) rotate(${rotation})`;
            
            svgContent += `<g transform="${transform}">${wordSvg}</g>`;
        });
        
        return svgContent;
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
            case 'visual-poetry':
                this.generateVisualPoetry(text);
                break;
            default:
                this.generateKvarH(text, 'brut');
        }
    }

    updateDecodingGuide(chars, type, patterns = null) {
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
                    const kvarHPattern = patterns ? patterns[char.toLowerCase()] || patterns[char] : null;
                    if (kvarHPattern) {
                        const patternStr = kvarHPattern.map(row => 
                            row.map(cell => cell ? '█' : '·').join('')
                        ).join('/');
                        const fontType = this.fontSelect.value.split('-').pop().toUpperCase();
                        patternText = `KVAR-H ${fontType} | Pattern: ${patternStr}`;
                    } else {
                        patternText = 'Horizontal blocks';
                    }
                    break;
                case 'vertical':
                    const kvarVPattern = patterns ? patterns[char.toLowerCase()] || patterns[char] : null;
                    if (kvarVPattern) {
                        const patternStr = Array.isArray(kvarVPattern) ? 
                            kvarVPattern.map(h => h === 1 ? '█' : '·').join('') : 
                            (kvarVPattern === 1 ? '█' : '·');
                        patternText = `KVAR-V | Pattern: ${patternStr}`;
                    } else {
                        patternText = 'Vertical segments';
                    }
                    break;
                case 'square':
                    const kvarSqPattern = patterns ? patterns[char.toLowerCase()] || patterns[char] : null;
                    if (kvarSqPattern) {
                        const patternStr = kvarSqPattern.map(row => 
                            row.map(cell => cell ? '█' : '·').join('')
                        ).join('/');
                        patternText = `KVAR-SQ | Pattern: ${patternStr}`;
                    } else {
                        patternText = 'Square blocks';
                    }
                    break;
                case 'epetri':
                    const epetriPattern = patterns ? patterns[char.toLowerCase()] || patterns[char] : null;
                    if (epetriPattern && Array.isArray(epetriPattern)) {
                        // Use proper Unicode block characters for height visualization
                        const patternStr = epetriPattern.map(h => {
                            switch(h) {
                                case 0: return '·';  // · (middle dot for empty)
                                case 1: return '▁';  // ▁ (lower block - 25%)
                                case 2: return '▄';  // ▄ (half block - 60%)
                                case 3: return '█';  // █ (full block - 100%)
                                default: return '?';
                            }
                        }).join('');
                        const form = this.epetriFormSelect.value.toUpperCase();
                        const weight = this.epetriWeightSelect.value.replace('-', ' ').toUpperCase();
                        patternText = `EPETRI ${form} ${weight} | Pattern: ${patternStr}`;
                    } else {
                        const form = this.epetriFormSelect.value.toUpperCase();
                        const weight = this.epetriWeightSelect.value.replace('-', ' ').toUpperCase();
                        patternText = `EPETRI ${form} ${weight} | Waveform bars`;
                    }
                    break;
                case 'midis-h':
                    const midisHPattern = patterns ? patterns[char.toLowerCase()] || patterns[char] : null;
                    if (midisHPattern) {
                        const patternStr = midisHPattern.map(row => 
                            Array.isArray(row) ? row.map(cell => cell ? '█' : '·').join('') : '·'
                        ).join('/');
                        patternText = `Diagonal movement | Pattern: ${patternStr}`;
                    } else {
                        patternText = 'Horizontal rectangles with diagonal movement';
                    }
                    break;
                case 'midis-v':
                    const midisVPattern = patterns ? patterns[char.toLowerCase()] || patterns[char] : null;
                    if (midisVPattern) {
                        const patternStr = midisVPattern.map(h => h === 0 ? '·' : h === 1 ? '▁' : h === 2 ? '▄' : '█').join('');
                        patternText = `Vertical segments | Pattern: ${patternStr}`;
                    } else {
                        patternText = 'Vertical segments with height variation';
                    }
                    break;
                case 'ricetta':
                    const ricettaPattern = patterns ? patterns[char.toLowerCase()] || patterns[char] : null;
                    if (ricettaPattern && ricettaPattern.segments) {
                        const segmentStr = ricettaPattern.segments.map(seg => {
                            const [start, end] = seg;
                            const length = Math.round((end - start) * 10);
                            const startPos = Math.round(start * 10);
                            return `${'·'.repeat(startPos)}${'\u2588'.repeat(length)}${'\u00b7'.repeat(10 - startPos - length)}`;
                        }).join('\n');
                        patternText = `Stretched lines (${ricettaPattern.rows} rows) | Pattern:\n${segmentStr}`;
                    } else {
                        patternText = 'Extremely stretched horizontal lines';
                    }
                    break;
                case 'vitkovac-h':
                    const vitkovacHPattern = patterns ? patterns[char.toLowerCase()] || patterns[char] : null;
                    if (vitkovacHPattern) {
                        const upStr = vitkovacHPattern.up.length > 0 ? '↑' + vitkovacHPattern.up.join(',') : '';
                        const downStr = vitkovacHPattern.down.length > 0 ? '↓' + vitkovacHPattern.down.join(',') : '';
                        const patternStr = [upStr, '—', downStr].filter(p => p).join(' ');
                        const currentForm = this.formSelect.value.toUpperCase();
                        const currentWeight = this.weightSelect.value.toUpperCase();
                        const currentIndex = this.indexStyleSelect.value;
                        patternText = `${currentForm} ${currentWeight} | Index: ${currentIndex} | Pattern: ${patternStr}`;
                    } else {
                        const currentForm = this.formSelect.value.toUpperCase();
                        const currentWeight = this.weightSelect.value.toUpperCase();
                        const currentIndex = this.indexStyleSelect.value;
                        patternText = `${currentForm} ${currentWeight} | Index: ${currentIndex} | Main line with alteration lines`;
                    }
                    break;
                case 'vitkovac-v':
                    const vitkovacVPattern = patterns ? patterns[char.toLowerCase()] || patterns[char] : null;
                    if (vitkovacVPattern) {
                        const leftStr = vitkovacVPattern.left.length > 0 ? '←' + vitkovacVPattern.left.join(',') : '';
                        const rightStr = vitkovacVPattern.right.length > 0 ? '→' + vitkovacVPattern.right.join(',') : '';
                        const patternStr = [leftStr, '│', rightStr].filter(p => p).join(' ');
                        const currentForm = this.formSelect.value.toUpperCase();
                        const currentWeight = this.weightSelect.value.toUpperCase();
                        patternText = `${currentForm} ${currentWeight} | Height: ${vitkovacVPattern.height} | Pattern: ${patternStr}`;
                    } else {
                        const currentForm = this.formSelect.value.toUpperCase();
                        const currentWeight = this.weightSelect.value.toUpperCase();
                        patternText = `${currentForm} ${currentWeight} | Vertical columns | Enter = new column`;
                    }
                    break;
                case 'visual-poetry':
                    const mode = patterns.mode || 'scattered';
                    const lineCount = patterns.lines || 1;
                    patternText = `VISUAL POETRY | Mode: ${mode.toUpperCase()} | Lines: ${lineCount} | Spatial composition using biometric typography`;
                    break;
            }
            patternDiv.textContent = patternText;
            
            breakdown.appendChild(charDiv);
            breakdown.appendChild(patternDiv);
            this.decodingGuide.appendChild(breakdown);
        });
    }

    copySvg() {
        const isTransparent = this.transparentBgToggle.checked;
        const selectedFont = this.fontSelect.value;
        const isPoetry = selectedFont === 'visual-poetry';
        const svgElement = isPoetry ? this.poetrySvg.cloneNode(true) : this.outputSvg.cloneNode(true);
        
        // Add background if not transparent
        if (!isTransparent) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', '0');
            rect.setAttribute('y', '0');
            rect.setAttribute('width', '100%');
            rect.setAttribute('height', '100%');
            rect.setAttribute('fill', 'white');
            svgElement.insertBefore(rect, svgElement.firstChild);
        }
        
        const svgString = new XMLSerializer().serializeToString(svgElement);
        navigator.clipboard.writeText(svgString).then(() => {
            this.showSuccessMessage('SVG copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            this.showSuccessMessage('Copy failed. Please try again.');
        });
    }

    updateSvgBackground() {
        const isTransparent = this.transparentBgToggle.checked;
        const selectedFont = this.fontSelect.value;
        const isPoetry = selectedFont === 'visual-poetry';
        const svgElement = isPoetry ? this.poetrySvg : this.outputSvg;
        
        if (!svgElement) return;
        
        if (isTransparent) {
            // Remove any existing background
            svgElement.style.background = 'transparent';
            // Remove white background from container
            svgElement.parentElement.style.background = 'transparent';
        } else {
            // Set white background
            svgElement.style.background = 'white';
            svgElement.parentElement.style.background = '#f8f9fa';
        }
    }


    downloadSvg() {
        const isTransparent = this.transparentBgToggle.checked;
        const selectedFont = this.fontSelect.value;
        const isPoetry = selectedFont === 'visual-poetry';
        const svgElement = isPoetry ? this.poetrySvg.cloneNode(true) : this.outputSvg.cloneNode(true);
        
        // Add background if not transparent
        if (!isTransparent) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', '0');
            rect.setAttribute('y', '0');
            rect.setAttribute('width', '100%');
            rect.setAttribute('height', '100%');
            rect.setAttribute('fill', 'white');
            svgElement.insertBefore(rect, svgElement.firstChild);
        }
        
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        const bgSuffix = isTransparent ? '-transparent' : '';
        const fontName = isPoetry ? `visual-poetry-${this.poetryModeSelect.value}` : this.fontSelect.value;
        a.download = `atypography-${fontName}${bgSuffix}-${Date.now()}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSuccessMessage('SVG downloaded!');
    }

    downloadPng() {
        const isTransparent = this.transparentBgToggle.checked;
        const exportScale = parseInt(this.exportSize.value);
        const selectedFont = this.fontSelect.value;
        const isPoetry = selectedFont === 'visual-poetry';
        const svgElement = isPoetry ? this.poetrySvg.cloneNode(true) : this.outputSvg.cloneNode(true);
        
        // Get original SVG dimensions
        const viewBox = svgElement.getAttribute('viewBox');
        const [, , originalWidth, originalHeight] = viewBox ? viewBox.split(' ').map(Number) : isPoetry ? [0, 0, 1200, 800] : [0, 0, 800, 200];
        
        // Scale the SVG content by modifying the viewBox to show the same content at a larger size
        const scaledWidth = originalWidth * exportScale;
        const scaledHeight = originalHeight * exportScale;
        
        // Set explicit width and height attributes for proper rendering
        svgElement.setAttribute('width', scaledWidth);
        svgElement.setAttribute('height', scaledHeight);
        
        // Keep the same viewBox so content scales up proportionally
        svgElement.setAttribute('viewBox', `0 0 ${originalWidth} ${originalHeight}`);
        
        // Add background if not transparent
        if (!isTransparent) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', '0');
            rect.setAttribute('y', '0');
            rect.setAttribute('width', originalWidth);
            rect.setAttribute('height', originalHeight);
            rect.setAttribute('fill', 'white');
            svgElement.insertBefore(rect, svgElement.firstChild);
        }
        
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        // Set canvas size to match the scaled SVG
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        
        // No need to scale context - SVG is already scaled
        if (!isTransparent) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, scaledWidth, scaledHeight);
        }
        
        img.onload = () => {
            // Draw the scaled SVG directly onto the canvas
            ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
            
            // Convert to PNG and download
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const bgSuffix = isTransparent ? '-transparent' : '';
                const scaleSuffix = exportScale > 1 ? `-${exportScale}x` : '';
                const fontName = isPoetry ? `visual-poetry-${this.poetryModeSelect.value}` : this.fontSelect.value;
                a.download = `atypography-${fontName}${bgSuffix}${scaleSuffix}-${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                this.showSuccessMessage(`PNG downloaded at ${exportScale}x scale!`);
            }, 'image/png', 1.0);
        };
        
        img.onerror = () => {
            this.showSuccessMessage('PNG export failed. Please try SVG export instead.');
        };
        
        // Convert SVG to data URL
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        img.src = url;
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