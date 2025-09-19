
function loadEditor() {

    document.getElementById('jsoneditor').style.width = editorOptions.width;
    document.getElementById('jsoneditor').style.height = editorOptions.height;
    document.getElementById('jsoneditor').style.border = editorOptions.border;
    require(['N/currentRecord',"N"], (currentRecord, netsuite) => {
        console.log(netsuite);
        var thisRecord = currentRecord.get();

        if (thisRecord.isReadOnly) {
            mode = "view";
        } else {
        
        }

            const text = document.querySelector(
            'div[data-field-name="custrecord_field_with_json_data"] span[data-nsps-type="field_input"]'
            )?.innerText;

        console.log(text);

        console.log(JSON.stringify(thisRecord));
        console.log(thisRecord.getField(editorOptions.netsuiteFieldId));
        console.log(thisRecord.getValue(editorOptions.netsuiteFieldId));
        var container = document.getElementById("jsoneditor");
        var options = {
            mode: "tree",
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
            console.log(thisRecord.getValue({fieldId: editorOptions.netsuiteFieldId}));



            const rawJson = JSON.parse(thisRecord.getValue({fieldId: editorOptions.netsuiteFieldId}));
            console.log(rawJson);
            editor.set(rawJson);
        } catch(e) {
            console.log(e)
            editor.set({});
        }
    });

}
