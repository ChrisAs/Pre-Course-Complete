$(function () {

  // We need the user media throughout our code, so we store it in the outer scope.
  var userMedia;

  // This is @instagrames account ID, the instragrammer that
  // we're following for this coding assignment.
  var USER_ID = '200482';

  window.Instagram.getUser(USER_ID, function (userData) {
    // Here you need to call the renderUserInfo() function.
    // As you guess from its name, it's used to render the user information on page.
    // Can you figure out what parameter you should to pass to it?
    // If you do things right, you'll see the profile picture appear.
    renderUserInfo(userData);
  
    // Mmm... what about the other user info? Go fix the renderUserInfo function!
  });

  window.Instagram.getUserRecentMedia(USER_ID, function (media) {
    // We'll need this userMedia later...
    userMedia = media;
    // Here we're rendering the user pictures. But something is not
    // ok in this function. Let's go there and fix it.
    renderUserMedia(media);

    // Now that our project starts to look fancy let's add a bit of extra
    // functionality to it. We'll show a list with all the user's hashtags.
    // This list should be sorted by frequency (number of appearances).
    // When the user clicks on a hashtag, we'll filter the pictures shown on page
    // to include only the ones that have that hashtag.

    // First we need to collect all the hashtags.
    var tags = extractTagsFromMedia(media);

    // Next, we want to sort them by frequency.
    // Look at the function and try to figure out how!
    var sortedTags = sortTagsByFrequencyDesc(tags);

    // Mmm... these are a lot of hashtags! Can you implement a function
    // that filters the array to include only the most relevant hashtags?
    // The function should take 2 arguments: (tags, minFrequency)
    // where "tags" is the sorted array of hashtags, and "minFrequency"
    // is a number representing the minimum frequency allowed, in this case, we will pass 2.
    // It returns a new array of hastags with frequency equal or above the set limit.
    var minFrequency = 2;
    var filteredTags = filterTagsByLimit(sortedTags, minFrequency);
    // Guess what? Another render function that is broken!
    // Let's go and fix it.
    
    renderTags(filteredTags);

    // Used for testing (feel free to ignore it)
    window.pageIsReady && window.pageIsReady();
  });
  function filterTagsByLimit (sortedTags, minFrequency) {
    let arr = [];
    sortedTags.forEach(function (obj) {
      for (let key in obj) {
        if (typeof obj[key] === 'number') {
          if (obj[key] >= minFrequency) {
            arr.push(obj);
          }
        }
      }
    });
    return arr;
  }
  function extractTagsFromMedia (media) {
    // Here we create an object with all the hashtags as keys.
    // Then assign the value of every key to the frequency of that tag.
    var tagFrequency = {};
    media.forEach(function (mediaItem) {
      mediaItem.tags.forEach(function (tagId) {
        if (tagFrequency[tagId]) {
          tagFrequency[tagId]++;
        } else {
          tagFrequency[tagId] = 1;
        }
      });
    });

    // Here we transform this object into an array, so we'll be able to sort it.
    // Object.keys() returns an array of all the keys in an object.
    // In this case, an array with all our tag ids.
    var tags = Object.keys(tagFrequency).map(function (tagId) {
      return {
        id: tagId,
        frequency: tagFrequency[tagId]
      };
    });
    return tags;
  }

  // Finally we have to sort the array in descending order (higher frequencies first),
  // and return it. Check the "Array.prototype.sort()" docs, and
  // figure out how to create the right sort function.
  // 💯 Extra credit: Change the function, so it doesn't modify the original array!
  function sortTagsByFrequencyDesc (tags) {
    var res = tags.sort((a, b) => (a.frequency < b.frequency) ? 1 : -1);
    return res;
  }

  function renderUserInfo (user) {
    // This is how the user profile picture is rendered.
    $('#user img').attr('src', user.profile_picture);
    
    // Now figure out how to render the remaining user information.
    // For example the h1 title should show the username. And the other fields
    $('#user h1').text(user.full_name);
    $('#num-media').text(user.counts.media);
    $('#num-followers').text(user.counts.followed_by);
    $('#num-follows').text(user.counts.follows);
    // need to show the number of followers, follows, and posted images.

    // Once you're done here, take a look at the Instagram.getUserRecentMedia() callback.
  }

  function renderUserMedia (media) {
    // First of all we need to remove all the content of the .user-media div.
    // Btw, you might need to do something similar later in other functions,
    // and we're not going to mention it, it's up to you to figure out when!
    $('.user-media').html('');
    $('.user-media').empty();
    media.forEach(function (mediaItem) {
      // Let's create an empty div element with jQuery. In this div we'll show
      // a picture. Notice that since we're in a forEach "loop",
      // we're creating a div for every picture provided by the API.
      var div = $('<div>');
      var standImg = mediaItem.images.standard_resolution.url;
      // In order to nicely render this div, here you need to add
      // two CSS classes to it: "user-media-item" and "u-pull-left".
      // Figure out how to do it by digging into the jQuery docs.
      div.addClass('user-media-item');
      $(div).addClass('user-media-item u-pull-left');
      // We want to show all the pictures as squares, even when they originally
      // have round borders. For this we use a CSS technique that sets the picture
      // as the background image of the element (feel free to check the CSS rules
      // that have been set for ".user-media-item" if you're curious about it).
      // Now add the "background-image" CSS property to the div using jQuery
      // and assign the correct value to it.
      div.css('background-image', 'url(' + standImg + ')');
      $('.user-media').append(div);
      // Finally you have to append the div we just created into the
      // ".user-media" div. Notice that the jQuery append function
      // accepts other jQuery objects.

      // Ok, now go back and continue checking the code from where you left before
      // fixing this function. Btw, we're not going to mention this anymore,
      // as by now navigating code should look familiar to you.
    });
  }

  function renderTags (tags) {
    var tagList = $('.tag-list ul');

    // Let's iterate over all the tags in the list.
    tags.forEach(function (tag) {
      // First, you need to create an empty "a" link tag with jQuery. Remember the div we
      // created earlier in this assignment? It should give you some inspiration.
      // Then fill this tag content with the hashtag itself and its frequency.
      let a = $('<a></a>');
      a.append(`#${tag.id} (${tag.frequency} times)`);

      // Now create a "li" tag and add the class "u-pull-left" to it.
      // In case you wonder this class is built-in in a CSS framework
      // we're using here: skeleton css (http://getskeleton.com/).
      // Then, add the "a" tag we just created to the "li" content.
      let li = $('<li/>').addClass('u-pull-left');
      li.append(a);
      // Finally append the "li" to the tag list.
      tagList.append(li);

      // Now let's add a bit of action. We want the user to be able to filter the images
      // by clicking on the tags in the list. For this we need to bind the click event
      // on the "a" tag to the "handleClickTag" function we have here below.
      // When the user clicks on the link though, we need to know what tag he clicked on.
      // To makes things simpler, jQuery lets us save additional information inside the html element.
      // For example the line below records an association between each "a" element (remember
      // we're in a "forEach" loop) and the tag id it refers to.
      // We'll be using this in a moment inside the "handleClickTag" function.
      a.data('tagId', tag.id);
      // Here you need to bind the click event of the "a" tag to the "handleClickTag" function.
      // Then, go to the function declaration to fix it.
      a.bind('click', handleClickTag(event));

    });
  }

  function handleClickTag (event) {
    // This is a handler function that is bound to the click event. jQuery will call this function,
    // passing the event information, when one of the links we prepared before is clicked.
    // The event object, among other data, contains the target: the link that was clicked.
    // among other data contains the target: the link that was clicked.
    // So, we can cast the HTML element that was clicked into a jQuery object by doing the following.
    var link = $(event.target);

    // Now we can retrieve the tag data stored in it.
    var tagId = link.data('tagId');

    // Once we know what tag the user clicked, we can filter the images. You need to create
    // a function that returns an array containing only images with a certain tag.

    // Ok, finally you can re-render the filtered media here!

  }

});
