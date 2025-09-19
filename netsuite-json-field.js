

async function getFieldValueInJsonFormat(fieldId) {

    require(['N/currentRecord'], (currentRecord) => {
    
        const thisRecord = currentRecord.get();

        var rawJson = thisRecord.getValue({fieldId: fieldId});

        // If we are in view only mode the field value might not be accessible due to NS quirk
        if (thisRecord.isReadOnly && !rawJson) {
            console.log(`div[data-field-name="${fieldId}"] span[data-nsps-type="field_input"]`)
            rawJson = document.querySelector(
                `div[data-field-name="${fieldId}"] span[data-nsps-type="field_input"]`
            )?.innerText;
        }

        console.log(rawJson);

        
        return JSON.parse(rawJson);
        
    });

}

async function setOriginalFieldValue(val) {

    console.log(val)

    require(['N/currentRecord'], (currentRecord) => {
        var thisRecord = currentRecord.get();

        try {
            const updatedJson = window.editor.get();
            thisRecord.setValue({
                fieldId: editorOptions.netsuiteFieldId,
                value: JSON.stringify(updatedJson)
            });
        } catch (err) {
            console.error("Invalid JSON", err);
        }        

    });

}

async function isReadOnly() {
    require(['N/currentRecord'], (currentRecord) => {
        var thisRecord = currentRecord.get();
        return thisRecord.isReadOnly;
    });
}

async function loadEditor() {

    var isReadOnly = await isReadOnly();
    var container = document.getElementById("jsoneditor");
    var options = {
        mode: isReadOnly ? "view" : "tree",
        onChange: () => setOriginalFieldValue(val)
    };

    window.editor = new JSONEditor(container, options);

    try {
        const jsonObject = await getFieldValueInJsonFormat(editorOptions.netsuiteFieldId);
        console.log(jsonObject);
        editor.set(jsonObject);
    } catch(e) {
        console.log(e)
        editor.set({});
    }


}
