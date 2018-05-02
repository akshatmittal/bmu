/*
(0) If the tree is empty, the first token in the expression (must be an operator) becomes the root

(1) Else if the last inserted token is an operator, then insert the token as the left child of the last inserted node.

(2) Else if the last inserted token is an operand, backtrack up the tree starting from the last inserted node and find the first node with a NULL right child, insert the token there. **Note**: don't insert into the last inserted node. 
*/

//Node Drawing
var currentToken;
var lastOperand;
class Node {
  constructor(value) {
    this.value = value;
    this.left = undefined;
    this.right = undefined;
    this.parent = undefined;
  }
}
class ExpTree {
  constructor(symbols) {
    lastOperand = false;
    this.add(symbols);
  }
  add(n) {
    currentToken = getToken(n);
    var newbie = new Node(currentToken);
    if (!this.root) {
      this.root = newbie;
      currentToken = getToken(n);
      walk(this.root);
    }

    function walk(node) {
      if (currentToken) {
        var newbie = new Node(currentToken);
        if (lastOperand === false) {
          node.left = newbie;
          node.left.parent = node;
          lastOperand = /^[a-z0-9]+$/i.test(currentToken);
          currentToken = getToken(n);
          walk(node.left)
        } else {
          if (!node.parent.right) {
            node.parent.right = newbie;
            node.parent.right.parent = node.parent;
            lastOperand = /^[a-z0-9]+$/i.test(currentToken);
            currentToken = getToken(n);
            walk(node.parent.right);
          } else {
            walk(node.parent);
          }
        }
      } else {
        return;
      }
    }

    function getToken(arr) {
      return arr.shift();
    }
  }
  draw(el, callback) {
    function walk(el, node) {
      var nodeEl = document.createElement('div');
      var nodeCir = document.createElement('div');
      nodeCir.className = 'node';
      var valueEl = document.createTextNode(node.value);
      var childrenEl = document.createElement('div');
      childrenEl.className = 'children';
      nodeCir.appendChild(valueEl);
      nodeEl.appendChild(nodeCir);
      nodeEl.appendChild(childrenEl);
      el.appendChild(nodeEl);
      // if (node.left) walk(childrenEl, node.left);
      // if (node.right) walk(childrenEl, node.right);
    
      if (node.left) setTimeout(function(){walk(childrenEl, node.left)}, 750);
      if (node.right) setTimeout(function(){walk(childrenEl, node.right)}, (node.left)?1250:750);

      // if(!node.left && !node.right) setTimeout(function(){
      //   callback()
      // }, 4500)
    }
    walk(el, this.root);
  }
}

String.prototype.allReplace = function (obj) {
  var retStr = this;
  for (var x in obj) {
    retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
  }
  return retStr;
};

function ReverseInfix(infx) {
  var str = infx
    .replace(/\*/g, ' * ')
    .replace(/\//g, ' / ')
    .replace(/\+/g, ' + ')
    .replace(/\-/g, ' - ')
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ');
  var infixArray = str.trim().split(/\s+/g);
  var reverseArray = infixArray.reverse();
  return reverseArray;
}

function OperatorHierarchy(op1, op2) {
  var h1, h2;
  switch (op1) {
    case "/":
    case "*":
      h1 = 2;
      break;
    default:
      h1 = 1;
  }
  switch (op2) {
    case "/":
    case "*":
      h2 = 2;
      break;
    default:
      h2 = 1;
  }
  return h1 > h2;
}

function InfixToPrefix(infx) {
  var RIS = [];
  var RPS = [];
  var S = [];
  RIS = ReverseInfix(infx);
  console.clear();
  console.log("Infix: " + infx);
  RIS.forEach(function (ch) {
    console.log("Stack: " + S);
    console.log("String: " + RPS);
    var operatorScanned = !/^[a-z0-9]+$/i.test(ch);
    var isOperand = /^[a-z0-9]+$/i.test(ch);
    if (isOperand) {
      RPS.push(ch);
    } else if (ch == ")") {
      S.push(ch);
    } else if (ch == "(") {
      for (var i = S.length - 1; i >= 0; i--) {
        if (S[i] != ")") {
          RPS.push(S.pop());
        } else {
          S.pop();
          return;
        }
      };
    } else {
      for (var j = S.length - 1;
        (j >= 0) && S[j] != ")" && OperatorHierarchy(S[j], ch); j--) {
        RPS.push(S.pop());
      }
      S.push(ch);
    }
  });
  for (var m = S.length - 1; m >= 0; m--) {
    RPS.push(S.pop());
  }
  return RPS;
}

//Click events
document.getElementById("Evaluate").onclick = function () {
  Evaluate();
};

/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function Evaluate() {
  var infix = document.getElementById("Entry").value;
  if (infix) {
    //Infix to prefix
    var reversePrefix = InfixToPrefix(infix);
    var prefix = reversePrefix.reverse();
    //Prefix array
    console.log("Prefix: " + prefix.join(""));
    document.getElementById('Prefix').innerHTML = "Prefix: " + prefix.join(" ") + ", Result: " + eval(infix);
    //Evaluate & draw
    const et = new ExpTree(prefix);
    console.log(et);
    var treeContent = document.getElementById('Tree');
    treeContent.innerHTML = "";
    document.getElementById('PrefixWrapper').className = "invisible";
    document.getElementById('PrefixWrapper').className = "visible";
    et.draw(treeContent, function(e) {
      document.getElementById('PrefixWrapper').className = "visible";
    });
    //Print prefix

    document.querySelector(".controls-wrapper").className = "controls-wrapper";
  } else {
    //alert("Enter an expression");
    document.getElementById('Prefix').innerHTML = "Error";
    document.getElementById('PrefixWrapper').className = "visible";
    document.querySelector(".controls-wrapper").className += " error";
    var treeContent = document.getElementById('Tree');
    treeContent.innerHTML = "";
  }
}