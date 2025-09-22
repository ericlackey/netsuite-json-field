import { createJSONEditor } from 'vanilla-jsoneditor'

export function loadEditor() {

     require(['N/currentRecord'], (currentRecord) => {

        const thisRecord = currentRecord.get();

        const getFieldValueInJsonFormat = (fieldId) => {

            var rawJson = thisRecord.getValue({fieldId: fieldId});

            // If we are in view only mode the field value might not be accessible due to NS quirk
            if (thisRecord.isReadOnly && !rawJson) {
                console.log(`div[data-field-name="${fieldId}"] span[data-nsps-type="field_input"]`)
                rawJson = document.querySelector(
                    `div[data-field-name="${fieldId}"] span[data-nsps-type="field_input"]`
                )?.innerText;
            }

            console.log(rawJson);
            
            return {"json": JSON.parse(rawJson)};
            
        };

        const setOriginalFieldValue = () => {

            console.log("changing field")

            try {
                const updatedJson = editor.get();
                console.log(updatedJson)
                thisRecord.setValue({
                    fieldId: editorOptions.netsuiteFieldId,
                    value: JSON.stringify(updatedJson.json)
                });
            } catch (err) {
                console.error("Invalid JSON", err);
            }        

        };



        const container = document.getElementById('jsoneditor')

        const jsonObject = getFieldValueInJsonFormat(editorOptions.netsuiteFieldId);
        
          var editor = createJSONEditor({
            target: container,
            props: {
                content: jsonObject,
                mode: "tree",
                readOnly: thisRecord.isReadOnly ? true : false,
                 onChange: () => setOriginalFieldValue(),
                mainMenuBar: false
            }
        });

        /*
        window.editor = new JSONEditor(container, options);

        try {
            const jsonObject = getFieldValueInJsonFormat(editorOptions.netsuiteFieldId);
            console.log(jsonObject);
            editor.set(jsonObject);
        } catch(e) {
            console.log(e)
            editor.set({});
        }*/


    });

}
