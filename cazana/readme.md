# Cazana Test

resources used:

- [Initial jest + TS setup](https://medium.com/swlh/jest-with-typescript-446ea996cc68)
- [date-fns](https://date-fns.org/) because I didn't want to reinvent the wheel for some date functionality. Ultimately was unused.
- [uuid](https://www.npmjs.com/package/uuid) so that each event could have their own unique ID for comparison purposes.

For the tsconfig.json I've gone with the defaults from tsc --init. It's not worth spending a long time tinkering with it for this. The only exception is downlevelIteration as VSCode insisted I needed it to solve a TS problem and I was inclined to agree.



Assumptions:
- The mileage values are the total mileage at the time of the event

Approach:

Set vs Array. Then requiring uuids.
The logical separations of each function.
Passing around the objects as arguments.



Mistakes made:

I definitely got distracted by the process as I was enjoying using TS and TDD. For example I wrote and tested a function for a certain approach I was thinking of and then never used it. Though you could argue that was maybe an example of TDD leading design decisions.

In trying to leverage TS a bit more I overcomplicated things. Parts of the code I'm happy with and others need tidying. Luckily due to the tests refactoring is much easier.

Next Steps:

Extract the code that processes the timeline from the timeline itself. The Timeline.ts file no longer conforms to the SRP. Likely the function `calculateMileageValues` and most things it calls could be extracted.

Write more tests, especially focussing on unhappy paths and trying to find ways to break existing functionality. The tests for each file should also be in a specific file instead of all in 1 long test file.