const Person = function(firstAndLast) {
    // Only change code below this line
    // Complete the method below and implement the others similarly
    const props = {
        _firstName: firstAndLast.split(" ").splice(0, 1).join(),
        _lastName: firstAndLast.replace(/(\w+\s)(\w+$)/, "$2"),
        _fullName: firstAndLast,
    };

    const getFullName = () => props._fullName;
    const getFirstName = () => props._firstName;
    const getLastName = () => props._lastName;
    const setFullName = (full) => props._fullName = full;
    const setFirstName = (first) => props._firstName = first;
    const setLastName = (last) => props._lastName = last;

    this.getFullName = function() {
        return getFullName();
    };
    this.getFirstName = function() {
        return getFirstName();
    }
    this.getLastName = function() {
        return getLastName();
    }
    this.setFullName = function(firstAndLast) {
        setFullName(firstAndLast);
        setFirstName(firstAndLast.split(" ").splice(0, 1).join());
        setLastName(firstAndLast.replace(/(\w+\s)(\w+$)/, "$2"));
    };
    this.setFirstName = function(first){
        setFirstName((first));
        setFullName(first + " " + getLastName())
    };
    this.setLastName = function(last){
        setLastName(last);
        setFullName(getFirstName() + " " + last)
    }
};

const bob = new Person('Bob Ross');