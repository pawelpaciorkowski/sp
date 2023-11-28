import React from "react";

export function getFormKeyAndValues(event: React.FormEvent<HTMLFormElement>) {
    // @ts-ignore
    const formData = new FormData(event.target);
    const valuesWithKeys: any = {};
    formData.forEach((value, key) => {
        if (value === "true" || value === "false") {
            value = JSON.parse(value);
        }
        valuesWithKeys[key] = value;
    });
    //for datepicker widget
    if (valuesWithKeys.hasOwnProperty("day")) delete valuesWithKeys.day;
    if (valuesWithKeys.hasOwnProperty("month")) delete valuesWithKeys.month;
    if (valuesWithKeys.hasOwnProperty("year")) delete valuesWithKeys.year;
    //end for datepicker widget
    return valuesWithKeys;
}

export function formatDateToDdMmYyyy(date: Date | any) {
    const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (add 1 because months are zero-based) and pad with leading zero if needed
    const year = date.getFullYear(); // Get the year

    return `${year}-${month}-${day}`;
}

export function fieldCanBeVisible(field: any, formData: any) {
    // TODO: check all visible options - for now function can be used successfully in Karta Klienta
    if (field.hasOwnProperty('attr') && field.attr.hasOwnProperty('visible')) {
        const visibleAttr = field.attr.visible.split(':')
        if (formData[visibleAttr[0]] === visibleAttr[1]) return true
        if (typeof(formData[visibleAttr[0]]) === 'object' && formData[visibleAttr[0]].hasOwnProperty('value') && formData[visibleAttr[0]].value === visibleAttr[1]) return true
        return false
    }
    return true
}

export function isObjectEmpty(obj: object) {
    return Object.keys(obj).length === 0;
  }
  