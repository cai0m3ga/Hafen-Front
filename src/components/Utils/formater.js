export const formater = {

    maxLength: (value, maxLength) => {

        if (!value)
            return '';

        if (typeof (value) !== "string" || typeof (maxLength) !== "number")
            return '';

        return value.substring(0, maxLength);

    },

    number: (value) => {

        if (!value)
            return '';

        if (typeof (value) !== "string")
            return '';

        return value.replace(/\D/g, '') + '';

    },

    template: (value, template) => {

        if (!value || !template)
            return '';

        if (typeof (value) !== "string" || typeof (template) !== "string")
            return '';

        let filteredValue = value.replace(/[^A-Za-z0-9]/g, '') + '';


        if (!filteredValue)
            return '';

        let currentIndex = 0;

        return [...template].reduce((accumulator, currentValue) => {

            console.log(accumulator, currentValue);

            if (typeof filteredValue[currentIndex] === "undefined")
                return accumulator;

            if (currentValue === '0' && !!filteredValue[currentIndex].match(/[0-9]/g)) {

                currentIndex++;
                return accumulator + filteredValue[currentIndex -1];

            }

            if (currentValue === 'A' && !!filteredValue[currentIndex].match(/[a-zA-Z]/g)) {

                currentIndex++;
                return accumulator + filteredValue[currentIndex -1];

            }

            if (currentValue !== 'A' && currentValue !== '0'){

                return accumulator + currentValue;

            }            
       
            currentIndex++;
            return accumulator;

        }, '');

    }

}