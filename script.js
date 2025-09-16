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
    }

    setupEventListeners() {
        this.textInput.addEventListener('input', () => this.generateFont());
        this.fontSelect.addEventListener('change', () => this.generateFont());
        this.biometricToggle.addEventListener('change', () => this.generateFont());
        this.scaleSlider.addEventListener('input', () => {
            this.scaleValue.textContent = this.scaleSlider.value;
            this.generateFont();
        });
        this.colorPicker.addEventListener('change', () => this.generateFont());
        this.copyBtn.addEventListener('click', () => this.copySvg());
        this.downloadBtn.addEventListener('click', () => this.downloadSvg());
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