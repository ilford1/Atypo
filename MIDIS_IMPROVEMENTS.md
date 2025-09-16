# Midis H and V Font Improvements

## Overview
The Midis H and V fonts have been significantly improved based on the analysis from Atypography2.pdf to properly implement the diagonal movement rules and biometric patterns.

## Key Improvements Made

### 1. **Midis H - Diagonal Movement Implementation**
- **Complete redesign** of character patterns based on PDF page 64
- **Proper diagonal movement rules**: No adjacent rectangles horizontally or vertically
- **Skipped field logic**: Vertical movement allowed when skipping one field ("body" pattern)
- **Complex patterns**: Multi-row diagonal patterns for letters like K, M, O, S, X, Z
- **Uppercase variants**: Different diagonal patterns for case variation

### 2. **Midis V - Height Variation System**
- **Redesigned patterns** based on PDF page 71 character set (FB-MN-midi-PR-index)
- **Proper height mapping**: 0=empty, 1=short (30%), 2=medium (60%), 3=tall (100%)
- **Extended patterns**: Multi-segment patterns for complex letters (M, N, O, V, W)
- **Uppercase scaling**: Taller patterns for uppercase variants
- **Number patterns**: Distinctive vertical patterns for 0-9

### 3. **Visual Quality Enhancements**

#### Midis H:
- **Better rectangle proportions**: 10x scale with 70% height for horizontal emphasis
- **Rounded corners**: Subtle aesthetic improvement
- **Diagonal connection hints**: Visual cues in biometric mode showing connections
- **Improved spacing**: Character-width-aware spacing

#### Midis V:
- **Enhanced segment distribution**: Better vertical positioning within character space
- **Height variation clarity**: Clear 30%/60%/100% height differences
- **Baseline indicators**: Subtle baseline markers in biometric mode
- **Better proportions**: 6x width for improved visibility

### 4. **Technical Improvements**
- **Case preservation**: Supports both uppercase and lowercase variants
- **Better biometric mode**: Tighter spacing and visual connection hints
- **Improved spacing algorithms**: Character-width-aware and word-boundary-aware
- **Enhanced SVG generation**: Better viewBox calculation and element positioning

### 5. **Pattern Examples**

#### Midis H Patterns:
- `a`: [[1,0,1],[0,1,0]] - Diagonal A pattern
- `o`: [[0,1,0],[1,0,1],[0,1,0]] - Closed counter (O shape)
- `m`: [[1,0,1],[0,1,0],[1,0,1]] - Multiple "bodies" for M
- `s`: [[0,1,1],[1,0,0],[0,1,1]] - S-wave diagonal pattern

#### Midis V Patterns:
- `m`: [1,1,1] - Triple segment M
- `s`: [0,1,2] - Height variation for S
- `t`: [2,1,1] - Tall start for T
- `v`: [1,1,1,1] - Extended V pattern

### 6. **Decoding Guide Enhancements**
- **Pattern visualization**: Shows actual patterns using Unicode characters
- **Midis H**: Uses █ and · to show diagonal patterns, separated by /
- **Midis V**: Uses ▁▄█ for height visualization
- **Clear descriptions**: Explains diagonal movement and height variation rules

### 7. **Biometric Mode Features**
- **Diagonal connection hints**: Subtle lines showing diagonal relationships in Midis H
- **Baseline indicators**: Horizontal markers in Midis V for multi-segment characters
- **Tighter spacing**: Better continuity for biometric appearance
- **Word separation**: Intelligent spacing between words

## Key Principles Implemented

### Midis H Diagonal Rules:
1. **No adjacent rectangles** horizontally or vertically
2. **Diagonal movement only** between rectangles
3. **Vertical skips allowed** when creating "body" or closed counter patterns
4. **Small spaces between glyphs** maintain biometric look while preserving boundaries

### Midis V Height System:
1. **Three height levels** with clear ratios (30%, 60%, 100%)
2. **Multiple segments** for complex letters
3. **Vertical distribution** within character space
4. **Uppercase scaling** for case differentiation

## Usage Recommendations

### Best Practices:
1. **Use biometric mode** for architectural integration where traditional typography would look kitsch
2. **Leverage diagonal patterns** in Midis H for unique geometric aesthetics
3. **Use height variation** in Midis V for rhythmic vertical compositions
4. **Consider uppercase variants** for emphasis and variety

### Reading Strategy:
- **Midis H**: Focus on diagonal flow and "body" patterns
- **Midis V**: Count vertical segments and note height differences
- **Both**: Use spacing gaps to identify character boundaries

## Technical Specifications

### Rendering:
- **Midis H**: 10x scale blocks, 70% height rectangles
- **Midis V**: 6x width blocks, 35x base height
- **Both**: 10% rounded corners, case-sensitive patterns
- **Spacing**: Biometric 5-10%, Regular 30-40%

### Pattern Complexity:
- **Basic letters**: 1-2 rows/segments
- **Complex letters**: 3+ rows/segments (K, M, O, S, W, X, Z)
- **Numbers**: Distinctive patterns for 0-9
- **Punctuation**: Basic patterns for common marks

The Midis fonts now properly implement the sophisticated movement patterns described in the Atypography manifesto, providing both artistic expression and functional readability when traditional typography is inappropriate.