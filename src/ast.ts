
export enum NodeTypes {
  // Root = "Root",
  NumberLiteral = "NumberLiteral",
  Program = "Program",
  StringLiteral = "StringLiteral",
  CallExpression = "CallExpression",
}



export type ChildNode = 
  | NumberLiteralNode
  | CallExpressionNode
  | StringLiteralNode;

export interface Node {
  type: NodeTypes;
}

export interface NumberLiteralNode extends Node{
  value: string;
  type: NodeTypes.NumberLiteral;
}

export interface StringLiteralNode extends Node {
  value: string;
  type: NodeTypes.StringLiteral;
}

// export interface CallExpressionName extends Node{
//     name: string;
//     params: ChildNode[];
// }
export interface CallExpressionNode extends Node {
  name: string;
  params: ChildNode[];
  type: NodeTypes.CallExpression;
  context?: ChildNode[];
}

export interface RootNode extends Node {
    body: ChildNode[];
    type: NodeTypes.Program;
    context?:ChildNode[];
}



export function createStringLiteralNode(value): StringLiteralNode {
  return {
    type: NodeTypes.StringLiteral,
    value,
  };
}



export function createRootNode(): RootNode {
    return {
        type: NodeTypes.Program,
        // type: NodeTypes.Root,
        body: []
    }
}



export function createNumberLiteralNode(value: string): NumberLiteralNode {
    return {
        type: NodeTypes.NumberLiteral,
        value: value
    }
}


export function createCallExpressionNode(name:string): CallExpressionNode {
  return {
      name: name,
      type: NodeTypes.CallExpression,
      params: [],
      context:[]
  }
}

