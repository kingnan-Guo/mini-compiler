// import { createRootNode,
//     // createStringLiteralNode,
//     creatNumberNode,
//     createCallExpressionNode,
//     NodeTypes,
//     Node,
//     ChildNode,
//     RootNode,
//     NumberNode,
//     CallExpressionNode

// } from "./ast";

import { ChildNode, NodeTypes, RootNode, NumberLiteralNode, CallExpressionNode } from "./ast";

type parentNode = RootNode | CallExpressionNode | undefined
type visitorFunctionType = (node:RootNode | ChildNode, parent:parentNode) => void;
interface visitorOption {
    // enter: (node:RootNode | ChildNode, parent:RootNode | ChildNode) => void,
    enter:visitorFunctionType;
    exit?(node:RootNode | ChildNode, parent:parentNode);
}

export interface Visitor{
    Program?: visitorOption,
    CallExpression?: visitorOption,
    NumberLiteral?: visitorOption,
    StringLiteral?: visitorOption
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
    // console.log("rootNode ", rootNode);
    function traverserArray(array: ChildNode[], parent?: parentNode) {
        array.forEach((node) => {
            traverserNode(node, parent)
        })
    }

    function traverserNode(node:RootNode | ChildNode,  parent?: parentNode) {
 
        //  Visitor 的进入 enter
        const visitorObj = visitor[node.type]
        if (visitorObj) {
            visitorObj.enter(node, parent)
        }

        switch (node.type) {
            case NodeTypes.NumberLiteral:
                console.log("NumberLiteral ", node, parent);
                break;
            case NodeTypes.CallExpression:
                console.log("CallExpression ", node);
                traverserArray(node.params, node)
                break;
            case NodeTypes.Program:
                console.log("Program ", node);
                traverserArray(node.body, node)
                break;
            default:
                break;
        }

        //  Visitor 的退出 exit
        if (visitorObj && visitorObj.exit) {
            visitorObj.exit(node, parent)
        }
    }

    traverserNode(rootNode)


}

