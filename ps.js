const PasswordChecker = (password) => {
  let steps = 0;
  let valuesAddition = 0;

  if (!password.match(/[A-Z]/)) {
    valuesAddition++;
  }
  if (!password.match(/[a-z]/)) {
    valuesAddition++;
  }
  if (!password.match(/\d/)) {
    valuesAddition++;
  }

  let groups = password.match(/(.)\1*/g).filter((x) => x.length > 2);

  if (password.length <= 20) {
    groups.forEach((group) => {
      steps += Math.trunc(group.length / 3);
      valuesAddition -= Math.trunc(group.length / 3);
    });
  }

  if (password.length <= 20) {
    valuesAddition = valuesAddition > 0 ? valuesAddition : 0;
    if (password.length + steps >= 6) {
      steps += valuesAddition;
    } else {
      if (valuesAddition > 6 - (password.length + steps)) {
        steps += valuesAddition;
      } else {
        steps += 6 - (password.length + steps);
      }
    }
  }

  if (password.length > 20) {
    let removeValue = password.length - 20;
    let lengths = [];
    let value = [];
    let check = 0;
    for (let i = 1; i <= 3; i++) {
      for (let k = 0; k < groups.length; k++) {
        if (value[k] === undefined) {
          value[k] = 0;
        }
        check = groups[k].length - value[k];
        if (lengths[k] === undefined) {
          lengths[k] = check;
        }
        const rec = () => {
          if (
            Math.trunc((check - i) / 3) < Math.trunc(check / 3) &&
            password.length - steps - i >= 6 &&
            removeValue >= i &&
            check > 2 &&
            lengths[k] - i > 0
          ) {
            steps += i;
            value[k] += i;
            removeValue -= i;
            check -= i;
            lengths[k] -= i;
            rec();
          }
        };
        rec();
      }
    }
    lengths.forEach((length) => {
      if (length > 2) {
        steps += Math.trunc(length / 3);
        valuesAddition -= Math.trunc(length / 3);
      }
    });

    removeValue = removeValue > 0 ? removeValue : 0;
    valuesAddition = valuesAddition > 0 ? valuesAddition : 0;
    steps += valuesAddition + removeValue;
  }

  return steps;
};

console.log(PasswordChecker("a"));
