function dragEvent(e) {
    let element = $(this)
    let offset = $(this).offset();
    let startX = e.pageX - offset.left;
    let startY = e.pageY - offset.top;

    $(document).on("mousemove", function(e){
        element.offset({
            top: e.pageY - startY,
            left: e.pageX - startX
        });
    });

    $(document).on("mouseup", function() {
        $(document).off("mousemove");
    });
}

// function dragElement(ele) {
//     pos1 = 0;
//     pos2 = 0;
//     pos3 = 0;
//     pos4 = 0;
//     ele.onmousedown = dragMouseDown;
// }

// function dragMouseDown(e) {
    
// }