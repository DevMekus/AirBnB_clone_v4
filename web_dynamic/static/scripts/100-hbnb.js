window.addEventListener("load", function () {
  $.ajax("http://0.0.0.0:5001/api/v1/status").done(function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  const amenityID = {};

  $(".amenities input[type=checkbox]").click(function () {
    if ($(this).prop("checked")) {
      amenityID[$(this).attr("data-id")] = $(this).attr("data-name");
    } else if (!$(this).prop("checked")) {
      delete amenityID[$(this).attr("data-id")];
    }
    if (Object.keys(amenityID).length === 0) {
      $("div.amenities h4").html("&nbsp;");
    } else {
      $("div.amenities h4").text(Object.values(amenityID).join(", "));
    }
  });

  const stateID = {};
  const cityID = {};

  $(".filters button").click(function () {
    $.ajax({
      type: "POST",
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      contentType: "application/json",
      data: JSON.stringify({
        amenities: Object.keys(amenityID),
        states: Object.keys(stateID),
        cities: Object.keys(cityID),
      }),
    }).done(function (data) {
      $("section.places").empty();
      $("section.places").append("<h1>Places</h1>");
      for (const place of data) {
        const template = `<article>
        <div class="title">
        <h2>${place.name}</h2>
        <div class="price_by_night">
      $${place.price_by_night}
      </div>
        </div>
        <div class="information">
        <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>

        <br />

      ${place.max_guest} Guests

      </div>
        <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

        <br />

      ${place.number_rooms} Bedrooms
      </div>
        <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

        <br />

      ${place.number_bathrooms} Bathroom

      </div>
        </div>
        <div class="description">

      ${place.description}

      </div>

      </article> <!-- End 1 PLACE Article -->`;
        $("section.places").append(template);
      }
    });
  });

  // task 6
  $(".stateCheckBox").click(function () {
    if ($(this).prop("checked")) {
      stateID[$(this).attr("data-id")] = $(this).attr("data-name");
    } else if (!$(this).prop("checked")) {
      delete stateID[$(this).attr("data-id")];
    }
    if (Object.keys(stateID).length === 0 && Object.keys(cityID).length === 0) {
      $(".locations h4").html("&nbsp;");
    } else {
      $(".locations h4").text(
        Object.values(stateID).concat(Object.values(cityID)).join(", ")
      );
    }
  });

  $(".cityCheckBox").click(function () {
    if ($(this).prop("checked")) {
      cityID[$(this).attr("data-id")] = $(this).attr("data-name");
    } else if (!$(this).prop("checked")) {
      delete cityID[$(this).attr("data-id")];
    }
    if (Object.keys(stateID).length === 0 && Object.keys(cityID).length === 0) {
      $(".locations h4").html("&nbsp;");
    } else {
      $(".locations h4").text(
        Object.values(cityID).concat(Object.values(stateID)).join(", ")
      );
    }
  });
});
