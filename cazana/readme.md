# Cazana Coding Test

At Cazana, our biggest strength is being able to combine disparate pieces of information about a vehicle from different sources and generating new insights.
In order to calculate the valuation of a vehicle, one of the things we need is an estimate of its current mileage. We do this by looking at data points in the vehicle’s history to estimate the vehicle’s average
annual mileage. From there we project forward from the most recent event to work out how many
miles it will have likely done until now.
We calculate the annual mileage between the data points and then take the average of those.

## Models

## Vehicle

- id
- VRM (number plate)
- make (e.g., Ford)
- model (e.g., Fiesta)
- first registration date

The vehicle has a timeline of events that have occurred over the vehicle’s life, such as:

## Advertised for sale
- date
- price
- mileage

## MOT test (roadworthy test)
- date
- mileage
- result (pass/fail)

## Change of VRM (number plate changes)
- date
- from VRM
- to VRM

Task
Provide a way to estimate a vehicle’s current mileage using the timeline.
1. Calculate the average annual mileage using the events in the timeline.
2. Estimate the vehicle’s current mileage by projecting from the most recent event using the
average annual mileage.
3. If there are no timeline events with mileage, calculate using 7,900 miles per year as the
average.


## How to pass the test

Submit working code, ideally driven by tests, but command line is fine too.
You don’t need to build a complete application with a UI or persistence. We’re just interested
in seeing how you design and model the domain.
Don’t use a framework or database. Libraries such as Carbon are fine.
Following a red-green-refactor TDD process would be great, if you’re familiar with it.
Commit often.
Email a zip of your entire project (including the .git directory.)
Provide instructions on how to run it.
