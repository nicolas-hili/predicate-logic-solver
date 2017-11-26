visualizer = (function() {
  "use strict";

  var visualize = function (formulas) {
    var html="";
    for (var i = 0; i < formulas.length; i++) {
      html += visualizeFormula(formulas[i]);
      if (i < formulas.length-1) {
        html+="<br />";
      }
    }
    return html;
  }

  var visualizeFormula = function (formula) {
    var type = formula.type;
    switch (type) {
      case "atomic":
        return visualizeAtomicFormula(formula);
      break;
      case "unary":
        return visualizeUnaryFormula(formula);
      break;
      case "binary":
        return visualizeBinaryFormula(formula);
      break;
      case "quantified":
        return visualizeQuantifiedFormula(formula);
    }
  }

  var visualizeAtomicFormula = function (formula) {
    var html = "";
    html += visualizeExpr(formula.e1);
    if (formula.e2) {
      html += " ";
      html += visualizeRelOp(formula.rel_op);
      html += " ";
      html += visualizeExpr(formula.e2);
    }
    return html;
  }

  var visualizeUnaryFormula = function (formula) {
    var html = "";
    html += visualizeUnOp(formula.un_conn);
    html += "( "+visualizeFormula(formula.f)+" )";
    return html;
  }

  var visualizeBinaryFormula = function (formula) {
    var html = "";
    html += "( "+visualizeFormula(formula.f1)+" )";
    html += " ";
    html += visualizeBinOp(formula.bin_conn);
    html += " ";
    html += "( "+visualizeFormula(formula.f2)+" )";
    return html;
  }

  var visualizeQuantifiedFormula = function (formula) {
    var html = "";
    html += visualizeQuantifier(formula.quant);
    html += visualizeVariable(formula.variable);
    if (formula.dom)
      html += visualizeDomain(formula.dom);
    html += ". ( "+visualizeFormula(formula.f)+" )";

    return html;
  }

  var visualizeQuantifier = function (quant) {
    if (quant === "forall") {
       return "&forall;"
    }
    else if (quant === "exists") {
        return "&exist;";
    }
    else {
      return quant;
    }
  }

  var visualizeDomain = function (domain) {
      return " : ["+domain.from+".."+domain.to+"]";
  }

  var visualizeExpr = function (expr) {
    switch (expr.type) {
      case "function":
        return visualizeFunctionSymbol(expr);
      break;
      case "predicate":
        return visualizePredicateSymbol(expr);
      break;
      default:
        return expr;
      break;
    }
  }

  var visualizeSymbol = function (expr) {
    var html = "";
    html += expr.name;
    if (expr.args.length) {
      html += "( ";
      for (var i = 0; i < expr.args.length; i++) {
        html += visualizeExpr(expr.args[i]);
        if (i < expr.args.length-1)
          html += ", ";
      }
      html += " )";
    }
    return html;
  }

  var visualizeFunctionSymbol = function (expr) {
    return visualizeSymbol(expr);
  }

  var visualizePredicateSymbol = function (expr) {
    return visualizeSymbol(expr);
  }

  var visualizeVariable = function (variable) {
    return variable;
  }

  var visualizeRelOp = function (relOp) {
    switch (relOp) {
      case "<":
        return "&lt;"
      break;
      case ">":
        return "&gt;"
      break;
      default:
        return relOp;
      break;
    }
  }

  var visualizeUnOp = function (unOp) {
    switch (unOp) {
      case "!":
        return "&not;"
      break;
      default:
        return unOp;
      break;
    }
  }

  var visualizeBinOp = function (unOp) {
    switch (unOp) {
      case "&&":
        return "&and;"
      break;
      case "||":
        return "&or;"
      break;
      case "->":
        return "&rarr;";
      break;
      case "<->":
        return "&harr;";
      break;
      default:
        return unOp;
      break;
    }
  }

  return {
    visualize: visualize
  }
})();
