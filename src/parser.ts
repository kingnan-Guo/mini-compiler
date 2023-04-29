import { TokenTypes, Tokens } from "./tokenizer";
import { NodeTypes } from "./ast";
import {
    createRootNode,
    // createStringLiteralNode,
    creatNumberNode,
    createCallExpressionNode,
    childNode
  } from "./ast";

// export interface Node {
//     type: NodeTypes;
// }

// type childNode = NumberNode | CallExpressionName

// interface RootNode extends Node{
//     body: childNode[];
// }

// interface NumberNode extends Node{
//     value: string;
// }


// interface CallExpressionName extends Node{
//     name: string,
//     params: childNode[]
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


// function creatNumberNode(value: string): NumberNode {
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
            // rootNode.body.push(creatNumberNode(token.value))
            current++
            return creatNumberNode(token.value)
        
        }
        if (token.type === TokenTypes.Paren && token.value === "(") {
            // 移动指针
            token = tokens[++current]
            // 开始创建 CallExpression
            // const node:childNode = {
            //     name: token.value,
            //     type: NodeTypes.CallExpression,
            //     params: []
            // }
    
            const node:childNode = createCallExpressionNode(token.value)
    
            // 移动指针
            token = tokens[++current]
    
    
            // 然后处理括号内部的 内容， 左括号之后  右括号 之前
            while(!(token.type === TokenTypes.Paren && token.value === ")")){
    
                // if (token.type === TokenTypes.Number) {
                //     // node.params.push(creatNumberNode(token.value))

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




