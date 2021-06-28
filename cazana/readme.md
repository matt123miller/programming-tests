# Cazana Test

Test was taken on 27th of June, 2021.

The test requirements can be found in [the pdf](./Cazana_back-end_coding_test.pdf) or [the markdown equivalent](./test-requirements.md).
## Installation

`npm install`

## Running the code

`npm test` will run the test script which uses Jest. This was originally written on an Arch Linux machine but has also been tested on a Windows 10 machine and all the tests pass on both machines.

## Resources 

- [TypeScript docs](https://www.typescriptlang.org/docs/)
- [Initial jest + TS setup](https://medium.com/swlh/jest-with-typescript-446ea996cc68)
- [date-fns](https://date-fns.org/) because I didn't want to reinvent the wheel for some date functionality. Ultimately was unused.
- [uuid](https://www.npmjs.com/package/uuid) so that each event could have their own unique ID for comparison purposes.

## Assumptions

- The mileage values are the total mileage at the time of the event

## Approach

I went with an approach of calling different functions in turn with different inputs, always returning something from each, to process the events as a sort of pipeline. Because most of those functions only relied on the `events` variable it did seem like they weren't totally at home within the `Timeline` class. Potentially they all could have been static functions (indeed 1 of them is) on the Timeline. But if a class is mostly static functions it then also feels a bit awkward to me in a language where those could be separate functions exported as is from a file.

For the tsconfig.json I've gone with the defaults from tsc --init. It's not worth spending a long time tinkering with it for this. The only exception is downlevelIteration as VSCode insisted I needed it to solve a TS problem and I was inclined to agree.

I changed between using an array, then a set and then back to array for tracking the events collection. Once I realised it would be useful if I had an identifying id for each event instance it seemed that I'd be reimplementing some of the uniqueness guarantees due to how they evauluate uniqueness. Also because they maintain insertion order and I had to sort the collection by date to allow events to be inserted in any order it made sense to then stick to array and implement the uniqueness and sorting myself.

## Mistakes made

I definitely got distracted by the process as I was enjoying using TS and TDD. For example I wrote and tested a function for a certain approach I was thinking of and then never used it. Though you could argue that was maybe an example of TDD leading design decisions.

In trying to leverage TS a bit more I overcomplicated things. Parts of the code I'm happy with and others need tidying. Luckily due to the tests refactoring is much easier.

## Next Steps

Extract the code that processes the timeline from the timeline itself. The Timeline.ts file no longer conforms to the SRP. Likely the function `calculateMileageValues` and most things it calls could be extracted.

Write more tests, especially focussing on unhappy paths and trying to find ways to break existing functionality. The tests for each file should also be in a specific file instead of all in 1 long test file.