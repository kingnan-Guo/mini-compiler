import { test, expect } from "vitest";
import { tokenizer, TokenTypes } from "../tokenizer";
// test("tokenizer", () => {
//     const code = `(add 2 (subtract 4 2))`;
//     const tokens = [
//         { type: 'paren',  value: '('        },
//         { type: 'name',   value: 'add'      },
//         { type: 'number', value: '2'        },
//         { type: 'paren',  value: '('        },
//         { type: 'name',   value: 'subtract' },
//         { type: 'number', value: '4'        },
//         { type: 'number', value: '2'        },
//         { type: 'paren',  value: ')'        },
//         { type: 'paren',  value: ')'        }
//     ];

//     expect(tokenizer(code)).toEqual(tokens)
// })


test("tokenizer", () => {
    const code = `(`;
    const tokens = [
        { type: TokenTypes.Paren,  value: '('},
    ];

    const ast = tokenizer(code)

    expect(ast).toEqual(tokens)
})