# README

## Requirements

`node.js` - I used 10.15, though 8+ should work fine.

`unix environment` - I had issues when jumping into windows to test in some browsers due to using Nodemon for a quicker feedback loop.

## Installation

`npm install`

## Comments

I estimate this project took maybe 2 hours of actual work writing and testing the code, with another hour at the beginning to remember how Express and Nunjucks worked. This was done mostly in a Linux environment though I jumped onto Windows towards the end to have a look in other browsers.

I went through a few ideas along the way on how to represent the data for ease of storage and access. This would also impact how I handled my routing, without resorting to url manipulation shenanigans. In the end I settled on using 1 object with a flat heirarchy to store all the user input story fragments along the way. This seems overly simplistic but after thinking through a few options beforehand and half developing a more complicated solution I definitely prefer this for now. 

Originally I intended to create a nested object something like this:

```JSON
{
    id: '0',
    text: 'initial text'
    north: {},
    east: {},
    south: {},
    west: {
        id: '1',
        text: 'go west?',
        north: {
            id: '2',
            text: 'then travel north?',
            north: {},
            east: {},
            south: {},
            west: {}
        },
        east: {},
        south: {},
        west: {}
    }
}
```
However I felt this would quickly become difficult to work with, both for querying and populating. Also storing the text isn't neat with this solution. Also as the size of data grows picking a suitable ID is going to become difficult (or lean on a GUID package) and querying this object is going to slow down as you trawl through the nesting to find the id of what you want, though the expected use case for this simple programming test shouldn't get large enough.

Instead I represented the data with the following approach:

```JSON
{
    '0': { text: 'Your story begins here' },
    '01' : {}
    '02' : {}
    '03' : {}
    '04' : { text: 'go west?' },
    '041' : { text: 'then travel north?' }
}
```

This relies on a simple system where north = 1, east = 2, south = 3 and west = 4. Each fragment has a unique ID created by concatenating these numbers together that will represent certain paths through the story. This also allows O(1) retrieval which is a convenient bonus.

Before starting the test I had hoped to create a more interesting system for creating the object keys. I'd hoped to maybe hash the user supplied text using a deterministic algorithm. This would have the added benefit of allowing circular stories where each step can link back to previous ones, though the supplied text would have to match exactly. Maybe in future you could add autocomplete/suggesting or dropdown containing past fragments.

I did lean heavily on objects as they seemed a good fit for this problem. However some other data structures might have been a better fit. I haven't heard of a linked list variant with n arbitrary links, though that would be nice to follow the links between story fragments. Maybe one of the newer JS data structures like Map or Set could be useful. I originally considered representing my flat object structure as an array of objects however I didn't want to traverse that all the time when objects give you easy traversal for free.

My code does rely on my templating language (nunjucks) and offloading some of the display logic and fiddly creation of forms and inputs. This could create a maintenance/extension burden when the forms obviously have to match the expectations of the backend code. In a production environment with more time I'd have separated out the forms themselves into a separate nunjuck files and [then included them](https://mozilla.github.io/nunjucks/templating.html#import). 

I would like to have added better accessibility support in the form of suggested text and better hover/focus interactions.

I also try to use JavaScript ES6+ features where possible which still has some support issues on older browser versions, however as there's no JS on the front end there should be no issues when using Node.JS 8+. Of course that doesn't guarantee that those reading the code may know or understand ES6 features like object destructuring or template literals which could be an issue.

## Initial Spec (Ask the employer before adding)