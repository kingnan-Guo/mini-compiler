export enum TokenTypes {
    Paren
}
interface Tokens {
    type: TokenTypes;
    value: string;
}

export function tokenizer(code:string) {
    const tokens:Tokens[] = []
    let current = 0
    let char = code[current]
    if (char === "(") {
        tokens.push({ 
            type: TokenTypes.Paren,  
            value: '('
        })
    }
    return tokens
}