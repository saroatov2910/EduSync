# Code Review Assignment - Submission Document

## Project Information
- **Project Name**: EduSync
- **GitHub Repository**: https://github.com/saroatov2910/EduSync
- **Problematic Code Branch**: code-standards-violations
- **Corrected Code Branch**: corrected-code

## Coding Standards Violations Documentation

### Violation 1: Component Name Using snake_case Instead of PascalCase
**File**: `src/components/Help.tsx`, line 5  
**Standard Violated**: React Component Naming Convention  
**Problematic Code**:
```typescript
const help_component: React.FC = () => {
```
**Explanation**: React components must use PascalCase naming convention. The use of snake_case violates the established standard for component identification and consistency.  
**Corrected Code**:
```typescript
const Help: React.FC = () => {
```

### Violation 2: Function Name Using Pascal_Snake_Case Instead of camelCase
**File**: `src/components/Help.tsx`, line 7  
**Standard Violated**: Function Naming Convention  
**Problematic Code**:
```typescript
const Display_Help_Content = () => {
```
**Explanation**: JavaScript/TypeScript functions should follow camelCase convention. Mixed case styles reduce code readability and violate established naming patterns.  
**Corrected Code**:
```typescript
const displayHelpContent = () => {
```

### Violation 3: Variable Names Using snake_case Instead of camelCase
**File**: `src/components/Help.tsx`, lines 8-9  
**Standard Violated**: Variable Naming Convention  
**Problematic Code**:
```typescript
const help_page_title = "Usage Instructions";
const instruction_list = [...];
```
**Explanation**: JavaScript/TypeScript variables must use camelCase. Snake_case naming creates inconsistency with language conventions and reduces code maintainability.  
**Corrected Code**:
```typescript
const helpPageTitle = "Usage Instructions";
const instructionList = [...];
```

### Violation 4: CSS Class Using Pascal_Snake_Case Instead of lowercase-hyphen
**File**: `src/cssRules/HelpPage.css`, line 4  
**Standard Violated**: CSS Class Naming Convention  
**Problematic Code**:
```css
.Help_Container {
```
**Explanation**: CSS classes should use lowercase-hyphen convention (kebab-case) for consistency with CSS best practices and improved readability.  
**Corrected Code**:
```css
.help-container {
```

### Violation 5: CSS Class Using camelCase Instead of lowercase-hyphen
**File**: `src/cssRules/HelpPage.css`, line 10  
**Standard Violated**: CSS Class Naming Convention  
**Problematic Code**:
```css
.helpTitleStyle {
```
**Explanation**: CSS class names should use lowercase-hyphen convention. CamelCase in CSS reduces readability and violates established CSS naming standards.  
**Corrected Code**:
```css
.help-title-style {
```

### Violation 6: CSS Class Using PascalCase Instead of lowercase-hyphen
**File**: `src/cssRules/HelpPage.css`, line 16  
**Standard Violated**: CSS Class Naming Convention  
**Problematic Code**:
```css
.HelpInstructionList {
```
**Explanation**: CSS classes must use lowercase-hyphen convention. PascalCase creates inconsistency with CSS standards and hampers maintainability.  
**Corrected Code**:
```css
.help-instruction-list {
```

### Violation 7: CSS Class Using snake_case Instead of lowercase-hyphen
**File**: `src/cssRules/HelpPage.css`, line 21  
**Standard Violated**: CSS Class Naming Convention  
**Problematic Code**:
```css
.help_text_content {
```
**Explanation**: CSS class naming requires lowercase-hyphen convention. Snake_case violates CSS best practices and creates maintenance difficulties.  
**Corrected Code**:
```css
.help-text-content {
```

### Violation 8: TypeScript File Name Using snake_case Instead of PascalCase
**File**: `src/Functions/utility_functions.ts`  
**Standard Violated**: TypeScript File Naming Convention  
**Problematic Code**: File name `utility_functions.ts`  
**Explanation**: TypeScript module files should use PascalCase naming to maintain consistency with module export patterns and improve project organization.  
**Corrected Code**: File name `UtilityFunctions.ts`

### Violation 9: Exported Functions Using snake_case and Pascal_Snake_Case
**File**: `src/Functions/UtilityFunctions.ts`, lines 3, 7  
**Standard Violated**: Function Naming Convention  
**Problematic Code**:
```typescript
export const calculate_total_score = (scores: number[]): number => {
export const Format_User_Name = (firstName: string, lastName: string): string => {
```
**Explanation**: Exported functions must follow camelCase convention for consistency with JavaScript/TypeScript standards.  
**Corrected Code**:
```typescript
export const calculateTotalScore = (scores: number[]): number => {
export const formatUserName = (firstName: string, lastName: string): string => {
```

### Violation 10: Interface Name Using snake_case Instead of PascalCase
**File**: `src/Functions/UtilityFunctions.ts`, line 11  
**Standard Violated**: Interface Naming Convention  
**Problematic Code**:
```typescript
export interface user_data {
```
**Explanation**: TypeScript interfaces must use PascalCase to follow established conventions for type definitions and maintain code clarity.  
**Corrected Code**:
```typescript
export interface UserData {
```

### Violation 11: Constant Using camelCase Instead of UPPER_SNAKE_CASE
**File**: `src/Functions/UtilityFunctions.ts`, line 17  
**Standard Violated**: Constant Naming Convention  
**Problematic Code**:
```typescript
export const maxStudentsPerClass = 30;
```
**Explanation**: Constants should use UPPER_SNAKE_CASE to clearly distinguish them from variables and follow established naming conventions.  
**Corrected Code**:
```typescript
export const MAX_STUDENTS_PER_CLASS = 30;
```

## Personal Reflection
Please refer to the `reflection.md` file for detailed personal insights about the learning process and challenges encountered during this assignment.

## Assignment Summary
This code review assignment successfully identified and corrected 11 distinct coding standards violations across multiple file types and naming conventions. All violations were systematically addressed to ensure compliance with established frontend development standards taught in the course.