var productList = document.getElementsByClassName("box-masonry");
for (var i = 0; i < productList.length; i++) {
    productList[i].addEventListener('click', function(event) {
        if (typeof gaData === "function") {
            gaData('event', 'link', {
                'event_category' : 'shop',
                'event_label' : event.target.href
              });
        }
    });
}
