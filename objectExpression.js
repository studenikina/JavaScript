/* Not operation 'classes' */

function Const() {
    this.value = arguments[0];
}
Const.prototype = {
    evaluate: function() {
        return this.value;
    },
    toString: function() {
        return this.value.toString();
    }
};

function Variable(name) {
    this.name = name;
}
Variable.prototype = {
    evaluate: function() {
        if (this.name == 'x') {
            return arguments[0];
        } else if (this.name == 'y') {
            return arguments[1];
        } else if (this.name == 'z') {
            return arguments[2];
        } else {
            throw new EvalError("unexpected variable name: " + variable);
        }
    },
    toString: function() {
        return this.name;
    }
};

/* Operation 'classes' */

function Operation(symbol, action, args) {
    this.symbol = symbol;
    this.action = action;
    this.args = args;
    this.evaluate = this.express(args);
}
Operation.prototype = {
    express: function(variables) {
        return function() {
            var appliedValues = [];
            for(var i in variables) {
                if (variables.hasOwnProperty(i)) {
                    if (typeof variables[i].evaluate == "function") {
                        appliedValues.push(variables[i].evaluate.apply(variables[i], arguments));
                    } else {
                        throw new TypeError("function expected, but "+(typeof variables[i])+" occured");
                    }
                }
            }
            return this.action.apply(this, appliedValues);
        }.bind(this);
    },
    toString: function() {
        var result = '';
        for(var i = 0; i < this.args.length; i++) {
            result += this.args[i].toString() + ' ';
        }
        result += this.symbol;
        return result;
    }
};

/* Binary operations */

function Add() {
    Operation.call(this, '+', function(a, b) {
        return a + b;
    }, arguments);
}
Add.prototype = Object.create(Operation.prototype);

function Subtract() {
    Operation.call(this, '-', function(a, b) {
        return a - b;
    }, arguments);
}
Subtract.prototype = Object.create(Operation.prototype);

function Multiply() {
    Operation.call(this, '*', function(a, b) {
        return a * b;
    }, arguments);
}
Multiply.prototype = Object.create(Operation.prototype);

function Divide() {
    Operation.call(this, '/', function(a, b) {
        return a / b;
    }, arguments);
}
Divide.prototype = Object.create(Operation.prototype);

/* Unary operations */

function Negate() {
    Operation.call(this, 'negate', function(x) {
        return -x;
    }, arguments);
}
Negate.prototype = Object.create(Operation.prototype);

function Cos() {
    Operation.call(this, 'cos', Math.cos, arguments);
}
Cos.prototype = Object.create(Operation.prototype);

function Sin() {
    Operation.call(this, 'sin', Math.sin, arguments);
}
Sin.prototype = Object.create(Operation.prototype);

/* TEST1 */
/*var polynomius = (new Add(new Variable('x'), new Const(10)));
console.log("string = "+polynomius.toString());
console.log("value = "+polynomius.evaluate(100)+"\n");*/

/* TEST2 */
/*var expr = new Subtract(
    new Multiply(
        new Const(2),
        new Variable("x")
    ),
    new Const(3)
);
console.log("string = "+expr.toString());
console.log("value = "+expr.evaluate(100)+"\n");*/

/* TEST3 */
/*var sincos = (new Add(new Sin(new Variable('x')), new Cos(new Variable('y'))));
console.log("string = "+sincos.toString());
console.log("value = "+sincos.evaluate(5419351, 4846147)+"\n");*/