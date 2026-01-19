export type PuzzleCategory = 'pattern' | 'grid' | 'path' | 'logic';
export type PuzzleDifficulty = 'easy' | 'medium' | 'hard';

export interface Puzzle {
    id: number;
    category: PuzzleCategory;
    difficulty: PuzzleDifficulty;
    titleJA: string;
    titleEN: string;
    descriptionJA: string;
    descriptionEN: string;
    // This will eventually contain game-specific configuration
}

export const puzzles: Puzzle[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    category: ['pattern', 'grid', 'path', 'logic'][Math.floor(Math.random() * 4)] as PuzzleCategory,
    difficulty: i < 30 ? 'easy' : i < 70 ? 'medium' : 'hard',
    titleJA: `パズル #${i + 1}`,
    titleEN: `Puzzle #${i + 1}`,
    descriptionJA: 'この謎を解き明かせ！',
    descriptionEN: 'Solve this mystery!'
}));
