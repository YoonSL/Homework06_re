$(function () {

    const render = function () {
        $('.content').empty();
        $('#buttonGo').removeClass('changingTodo');
        $('#buttonGo').addClass('addingTodo');
        

        $.ajax({url:'/api/todoList' ,method:'GET'})
        .then(function(data){
             for(let i = 0; i < data.length;i++){
                
                $('.content').append(
                    $('<div>').addClass('gridNew').append(
                        $('<div>').addClass('box grid1').append(
                            $('<button>')
                            .attr('id','change')
                            .addClass(`far fa-square clear checkTodo`)
                            .attr('data-index', i)
                        ),
                    $('<div>').addClass('box grid2').append(        
                        $('<p>')
                            .text(data[i].what)
                            .addClass('textTodo')
                        ),
                    $('<div>').addClass('box grid3').append(
                        $('<button>')
                            .addClass('fas fa-times clear deleteTodo')
                            .attr('data-index', i)
                        )
                )
                )
             }
            })
    }

    const checkToggle = function () {
        $(this).toggleClass("fa-square fa-check-square");
        $('#buttonGo').toggleClass("addingTodo changingTodo");
        let changeTodo = $(this).attr('data-index');
        console.log(changeTodo);

        $(document).on('click','.changingTodo',function(event){
            event.preventDefault();
            let newTodo = $(`#add`).val().trim();
            
            const newDatatoSend = {
                objectKey:newTodo,
                objectValue: changeTodo
            };
            console.log(changeTodo);
            console.log(newTodo);
            console.log(newDatatoSend);
            $.ajax({ url: '/api/todoList/', method: `PUT`, data: newDatatoSend})
                .then(function (data) {
                    if(data.success){
                    $('#add').val('');
                    changeTodo = '';
                    render();
                    }
                })
        })
    };



    addingTodo = function(event){
        event.preventDefault();
        console.log('hi');
        todoList = $('#add').val().trim();
        const newdata= {
            what:todoList
        };
        $.ajax({url:'api/todoList/',method:'POST', data:newdata})
            .then(function (data) {
                if (data) {
                    $('#add').val('');
                    $('#add').focus();
                    render();
                } else {
                    alert('Something is wrong');
                }
            })
    }

    const eraseTodo = function () {
        const entry = $(this).attr('data-index');
        console.log($(this));
        console.log(entry);
        
        // const index = entry.split('_')[1];
        // console.log(index);

        $.ajax({ url: `/api/todoList/`, method: 'DELETE', data: entry })
            .then(function (data) {
                console.log(data);
                if (data.success) {
                    render();
                } else {
                    alert('There was a problem with your submission. Please check your entry and try again.');
                }
            }
            )
    }

    $(document).on('click', '.addingTodo',addingTodo);
    $(`.content`).on('click', `#change`, checkToggle);
    // $(document).on('click', '.checkTodo', renderUpdateTodo);
    $(document).on('click', '.deleteTodo', eraseTodo);
    render();
});


 // const renderTodos = function (outputElement, dataList) {
    //     for (let i = 0; i < dataList.length; i++) {
    //         const output = $(outputElement);
    //         const outputType = outputElement.slice(1);
    //         const todoText = $(dataList[i]);
    //         const todo = $('<div>').addClass('todoLists');
    //         todo.append(
                // $('<button>')
                //     .addClass(`far fa-square clear checkTodo`)
                //     .attr('data-index', `${outputType} - ${i}`),
                // $('<p>')
                //     .text(todoText)
                //     .addClass('textTodo')
                //     .attr('data-index', `${outputType} - ${i}`),
                // $('<button>')
                //     .addClass('fas fa-times clear deleteTodo')
                //     .attr('data-index', `${outputType} - ${i}`),
    //         );
    //         console.log(dataList[i]);
    //         output.append(todo);
    //     }
    // };

    // const addingTodo = function () {
    //     $.ajax({url: '/api/todoList',method:'POST'})
    //     .then(function(todoList){
    //         $('.content').empty();
    //         renderTodos('.content',todoList);
    //         console.log(todoList);
    //     })
    // }
    // const eraseTodo = function () {
    //     const entry = $(this).attr('data-index');

    //     const index = entry.split('_')[1];

    //     $.ajax({ url: `/api/todoList/${index}`, method: 'DELETE' })
    //         .then(function (data) {
    //             if (data.success) {
    //                 render();
    //             } else {
    //                 alert('There was a problem with your submission. Please check your entry and try again.');
    //             }
    //         }
    //         )
    // }
    // const renderUpdateTodo = function(){
    //     const entry = $(this).attr('data-index');
    //     const i = parseInt(entry.split('_')[1]);

    //     console.log(entry);
    //     console.log(i);
    // }
    // const updateTodo = function(newTodo){
    //     const changeTodo = [$('#add').val().trim()];
    //     const index = newTodo.split('-')[1];

    //     $.ajax(
    //         {
    //             url: `/api/todoList/${index}`,
    //             method: 'PUT',
    //             data:changeTodo
    //         })
    //         .then(function(data){
    //             if(data.success){
    //                 render();
    //             }
    //         });
    // }
    // const runTodoQuery = function () {
    //     $.ajax({ url: '/api/todoList', method: 'GET' })
    //         .then(function (todoList) {
    //             $('.content').empty();
    //             renderTodos('.content', todoList);
    //         })
    // }