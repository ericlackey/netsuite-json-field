
function loadEditor() {

    document.getElementById('jsoneditor').style.width = editorOptions.width;
    document.getElementById('jsoneditor').style.height = editorOptions.height;
    document.getElementById('jsoneditor').style.border = editorOptions.border;
    require(['N/currentRecord',"N"], (currentRecord, netsuite) => {
        console.log(netsuite);
        var thisRecord = currentRecord.get();
        var recordId = thisRecord.id;
        var thisField = thisRecord.getField({fieldId: editorOptions.netsuiteFieldId})

        console.log(JSON.stringify(thisField));

        if (!recordId) {
            recordState = "create";
        }

        var container = document.getElementById("jsoneditor");
        var options = {
            mode: thisRecord.isReadOnly ? "view" : "tree",
            onChange: () => {
                try {
                    const updatedJson = window.editor.get();
                    thisRecord.setValue({
                        fieldId: editorOptions.netsuiteFieldId,
                        value: JSON.stringify(updatedJson)
                    });
                } catch (err) {
                    console.error("Invalid JSON", err);
                }
            }
        };

        window.editor = new JSONEditor(container, options);
        console.log('are we still going?')
        console.log(editorOptions.netsuiteFieldId)
        try {
            console.log(thisRecord.getText({fieldId: editorOptions.netsuiteFieldId}));

            var rawJson = {};

            /*if (thisRecord.isReadOnly) {
                rawJson = document.querySelector(
                'div[data-field-name="custrecord_field_with_json_data"] span[data-nsps-type="field_input"]'
                )?.innerText;
            } else {
            */
                rawJson = thisRecord.getText({fieldId: editorOptions.netsuiteFieldId})
            //}
            //const rawJson = JSON.parse(thisRecord.getValue({fieldId: editorOptions.netsuiteFieldId}));
            console.log(rawJson);
            editor.set(JSON.parse(rawJson));
        } catch(e) {
            console.log(e)
            editor.set({});
        }
    });

}
