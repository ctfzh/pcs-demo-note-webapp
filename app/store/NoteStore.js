/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('WebNoteDemo.store.NoteStore', {
    extend: 'Ext.data.Store',
    xtype: 'notestore',
    
    config: {
        model: 'WebNoteDemo.model.NoteDataModel',
        sorters: [{
                property: 'date',
                direction: 'DESC'
        }],
        proxy: {
            type: 'localstorage',
            id: 'notes-app-store'
        },
        
        data: [ 
        { id: 1, date: new Date(), title: 'Test Note 1', narrative: 'This is simply a test note' },
        { id: 2, date: new Date(), title: 'Test Note 2', narrative: 'This is simply a test note' } 
        ]
    }
    
});


