import { TokenTypes, Tokens } from "./tokenizer";
import { NodeTypes } from "./ast";
import {
    createRootNode,
    // createStringLiteralNode,
    createNumberLiteralNode,
    createCallExpressionNode,
    ChildNode
  } from "./ast";

// export interface Node {
//     type: NodeTypes;
// }

// type ChildNode = NumberNode | CallExpressionName

// interface RootNode extends Node{
//     body: ChildNode[];
// }

// interface NumberNode extends Node{
//     value: string;
// }


// interface CallExpressionName extends Node{
//     name: string,
//     params: ChildNode[]
// }

// function createRootNode():RootNode {
//     return {
//         // type: NodeTypes.Program,
//         type: NodeTypes.Root,
//         body: []
//     }
// }
// function createCallExpressionNode(name:string): CallExpressionName {
//     return {
//         name: name,
//         type: NodeTypes.CallExpression,
//         params: []
//     }
// }


// function createNumberLiteralNode(value: string): NumberNode {
//     return {
//         type: NodeTypes.NumberLiteral,
//         value: value
//     }
// }


export function parser(tokens: Tokens[]) {
    let current = 0
    const rootNode = createRootNode()

    function walk() {
        

        let token = tokens[current]
        // const rootNode:RootNode = {
        //     type: NodeTypes.Program,
        //     body: []
        // }
        if (token.type === TokenTypes.Number) {
            // const numberNode = {
            //     type: NodeTypes.NumberLiteral,
            //     value: token.value,
            // }
            // rootNode.body.push(createNumberLiteralNode(token.value))
            current++
            return createNumberLiteralNode(token.value)
        
        }
        if (token.type === TokenTypes.Paren && token.value === "(") {
            // 移动指针
            token = tokens[++current]
            // 开始创建 CallExpression
            // const node:ChildNode = {
            //     name: token.value,
            //     type: NodeTypes.CallExpression,
            //     params: []
            // }
    
            const node = createCallExpressionNode(token.value)
    
            // 移动指针
            token = tokens[++current]
    
    
            // 然后处理括号内部的 内容， 左括号之后  右括号 之前
            while(!(token.type === TokenTypes.Paren && token.value === ")")){
    
                // if (token.type === TokenTypes.Number) {
                //     // node.params.push(createNumberLiteralNode(token.value))

                // }
                node.params.push(walk())
                token = tokens[current]
            }
            // 跳过 右括号
            current++
            // rootNode.body.push(node)
            return node
    
        }
        throw new Error(`no type token  ${token}`);
    }

    

    while (current < tokens.length) {
        rootNode.body.push(walk()) 
    }

    return rootNode
}




