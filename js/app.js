'use strict';
let keywords = [];

$(document).ready(function () {

  function Animal(animal) {
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.keyword = animal.keyword;
    this.horns = animal.horns;
  }

  Animal.prototype.render = function () {
    let $animalClone = $('#photo-template').clone();
    $animalClone.find('h2').text(this.title);
    $animalClone.find('img').attr('src', this.image_url);
    $animalClone.find('p').text(this.description);
    $animalClone.find('h2').attr('id', this.title);

    $animalClone.attr('class', this.keyword);

    $('main').append($animalClone);
  };

  const readJason = () => {
    $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' }).then(data => {
      data.forEach(newEle => {
        let newAnimal = new Animal(newEle);
        newAnimal.render();
        if (!(keywords.includes(newEle.keyword))){
          keywords.push(newAnimal.keyword);
        }
      });

      keywords.forEach(function(filterEl){
        $('select').append($('<option></option>').html(filterEl).attr('id', filterEl).attr('class', 'dropDown'));
      });
    });
  };

  $('select').on('change', function() {

    $('section').show();

    var selectedVal = $(this).find(':selected').val();
    alert(selectedVal);
    $(`section:not(.${selectedVal})`).hide();
  }
  );
  readJason();


});
