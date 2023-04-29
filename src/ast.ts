export enum NodeTypes {
    Root = "Root",
    Program = "Program",
    NumberLiteral = "NumberLiteral",
    StringLiteral = "StringLiteral",
    CallExpression = "CallExpression",
    
}


export interface Node {
    type: NodeTypes;
}

export type childNode = NumberNode | CallExpressionName

export interface RootNode extends Node{
    body: childNode[];
}

export interface NumberNode extends Node{
    value: string;
}


export interface CallExpressionName extends Node{
    name: string,
    params: childNode[]
}

export function createRootNode():RootNode {
    return {
        // type: NodeTypes.Program,
        type: NodeTypes.Root,
        body: []
    }
}
export function createCallExpressionNode(name:string): CallExpressionName {
    return {
        name: name,
        type: NodeTypes.CallExpression,
        params: []
    }
}


export function creatNumberNode(value: string): NumberNode {
    return {
        type: NodeTypes.NumberLiteral,
        value: value
    }
}