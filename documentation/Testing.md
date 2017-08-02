#It must render
At the very least, make sure the component renders without error. This verifies there are no JSX syntax errors, that all variables are defined, etc. This could be as simple as verifying that the rendered output is not null.

#Test the output
One step above “it renders” is “it renders the correct thing.” Given a set of props, what output is expected? Does Person render its name and age, or does it render a name and “TODO: age coming in v2.1”?

#Test the states
Every conditional should be accounted for. If the classNames are conditional (enabled/disabled, success/warning/error, etc), make sure to test that the className-deciding logic is working well. Likewise for conditionally-rendered children: if the Logout button is only visible when the user is logged in, for instance, make sure to test for that.

#Test the events
If the component can be interacted with (an input or button with an onClick or onChange or onAnything), test that the events work as expected and call the specified functions with the correct arguments (including binding this, if it matters).

#Test the edge cases
Anything that operates on an array could have boundary cases — an empty array, an array with 1 element, a paginated list that should truncate at 25 items, and so on. Try out every edge case you can think of, and make sure they all work correctly.