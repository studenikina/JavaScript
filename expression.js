function operation(action) {
    return function(variables) {
        return function() {
            var values = arguments;
            var appliedValues = [];
            for(var i in variables) {
                if (variables.hasOwnProperty(i)) {
                    if (typeof variables[i] == "function") {
                        appliedValues.push(variables[i].apply(variables[i], values));

                    } else {
                        throw new TypeError("scalar occured, i = "+i);
                    }
                }
            }
            return action.apply(this, appliedValues);
        };
    };
}

function add() {
    return operation(function(a, b) {
        return a + b;
    })(arguments);
}

function subtract() {
    return operation(function(a, b) {
        return a - b;
    })(arguments);
}

function multiply() {
    return operation(function(a, b) {
        return a * b;
    })(arguments);
}

function divide() {
    return operation(function(a, b) {
        return a / b;
    })(arguments);
}

function negate() {
    return operation(function(a) {
        return -a;
    })(arguments);
}

function cnst() {
    var x = arguments[0];
    return function() {
        return x;
    };
}

function variable(variable) {
    return function() {
        if (variable == 'x') {
            return arguments[0];
        } else if (variable == 'y') {
            return arguments[1];
        } else if (variable == 'z') {
            return arguments[2];
        } else {
            throw new EvalError("unexpected variable name "+variable);
        }
    }
}


/*console.log(
    add(
        cnst(5),
        variable("x")
    )(6)
);

console.log(
    add(
        cnst(5),
        add(
            variable("x"),
            add(
                variable("y"),
                variable("z")
            )
        )
    )(5, 5, 1)
);*/

