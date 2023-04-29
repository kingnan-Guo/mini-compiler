import { describe, expect, it, test } from "vitest";
import { NodeTypes } from "../ast";
import { parser } from "../parser";
import { TokenTypes, tokenizer } from "../tokenizer";

describe("parser", () => {
  it("parser tokens to ast", () => {
    const tokens = [
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "add" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "subtract" },
      { type: TokenTypes.Number, value: "4" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Paren, value: ")" },
      { type: TokenTypes.Paren, value: ")" },
    ];
    const ast = {
      // type: NodeTypes.Program,
      type: NodeTypes.Root,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "2",
            },
            {
              type: NodeTypes.CallExpression,
              name: "subtract",
              params: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: "4",
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: "2",
                },
              ],
            },
          ],
        },
      ],
    };
    expect(parser(tokens)).toEqual(ast);
  });

  it("number", () => {
    const tokens = [{ type: TokenTypes.Number, value: "2" }];
    const ast = {
      // type: NodeTypes.Program,
      type: NodeTypes.Root,
      body: [
        {
          type: NodeTypes.NumberLiteral,
          value: "2",
        },
      ],
    };
    expect(parser(tokens)).toEqual(ast);
  });


  it.skip("name", () => {
    const tokens = [{ type: TokenTypes.String, value: "hello" }];

    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.StringLiteral,
          value: "hello",
        },
      ],
    };
    expect(parser(tokens)).toEqual(ast);
  });

  it("call expression (add 1 1)", () => {
    const tokens = [
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "add" },
      { type: TokenTypes.Number, value: "1" },
      { type: TokenTypes.Number, value: "1" },
      { type: TokenTypes.Paren, value: ")" },

      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "add" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Number, value: "3" },
      { type: TokenTypes.Paren, value: ")" },

    ];
    const ast = {
      // type: NodeTypes.Program,
      type: NodeTypes.Root,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "1",
            },
            {
              type: NodeTypes.NumberLiteral,
              value: "1",
            },
          ],
        },
        {
            type: NodeTypes.CallExpression,
            name: "add",
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: "2",
              },
              {
                type: NodeTypes.NumberLiteral,
                value: "3",
              },
            ],
          },


      ],
    };

    const p = parser(tokens)

    expect(p).toEqual(ast);
  });
});

