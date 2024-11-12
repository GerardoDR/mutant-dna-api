import { Response, Request } from "express";

export const isMutant = (req: Request, res: Response) => {

    if (isInvalidDna(req.body?.dna)) {
        console.log(isInvalidDna(req.body?.dna));
        res.status(400).send(`
            BAD REQUEST: dna must contain 6 string arrays of 6 characters each (valid characters: A,T,C,G)\n
            Your input: [${req.body?.dna}]`
        );
        return;
    }
    const dna = req.body.dna.map((nucleotide: string) => nucleotide.toLowerCase());
    if (checkRowsAndColumns(dna) || checkDiagonals(dna)) res.status(200).send('OK');
    else res.status(403).send('Forbidden');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isInvalidDna(dna: any) {
    if (
        !dna ||
        !Array.isArray(dna) ||
        dna.length !== 6 ||
        dna.some(item => (
            item.length !== 6 ||
            typeof item !== 'string' ||
            hasInvalidAminos(item)))
    ) { return true }
}

function hasInvalidAminos(nucleotide: string) {
    const validAminos = 'ATCG'
    for (const char of nucleotide) {
        if (!validAminos.includes(char)) {
            return true;
        }
    }
    return false;
}


function checkRowsAndColumns(dna: string[]): boolean {
    for (let i = 0; i < dna.length; i++) {
        if (hasSequence(dna[i]) || hasSequence(dna.map(row => row[i]).join(''))) {
            return true;
        }
    }
    return false;
}

function hasSequence(sequence: string): boolean {
    let count = 1;
    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] === sequence[i - 1]) {
            count++;
            if (count === 4) return true;
        } else {
            count = 1;
        }
    }
    return false;
}

function checkDiagonals(dna: string[]): boolean {
    return (
        checkDiagonal(dna, 0, 0, 1, 1) ||
        checkDiagonal(dna, 0, dna.length - 1, 1, -1) ||
        checkDiagonal(dna, 1, 0, 1, 1) ||
        checkDiagonal(dna, 0, 1, 1, 1) ||
        checkDiagonal(dna, dna.length - 1, 0, -1, 1) ||
        checkDiagonal(dna, dna.length - 2, 0, -1, 1) ||
        checkDiagonal(dna, dna.length - 1, 1, -1, 1)
    );
}

function checkDiagonal(dna: string[], startRow: number, startCol: number, rowStep: number, colStep: number): boolean {
    let count = 1;
    let prevChar = dna[startRow][startCol];

    for (let i = 1; i < 4; i++) {
        const row = startRow + i * rowStep;
        const col = startCol + i * colStep;

        if (dna[row]?.[col] === prevChar) {
            count++;
            if (count === 4) return true;
        } else {
            count = 1;
            prevChar = dna[row]?.[col];
        }
    }
    return false;
}

// [
//     ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
//     ["ATCGAT", "CGATCG", "GATCGA", "ATCGAT", "CGATCG", "GATCGA"],
//     ["AGTCAG", "TCAGTA", "CAGTAG", "GTACGT", "ACGTAC", "CGTACG"],
//     ["TTATGT", "AGAAGG", "CCCCTA", "TCACTG", "CAGTGC", "ATGCGA"],
//     ["QWERTY", "ASDFGH", "ZXCVBP", "UIOPJP", "LMQWEP", "TYUIOP"]
// ]
