# Contributing
Aka. Developer Guidelines

## Intro

We're currently _very_ early in the development stages of the Sublinks frontend. Therefore there aren't too many guidelines yet. However, as you can see below there are some that we would appreciate you to consider before and while you contribute to this project.

As with most things you'll read about in this document, even these guidelines are up for discussion. If you believe anything should be changed please feel free to create a pull request and let us know what and why. Same thing applies if you want to add or stricten/loosen a guideline.

### Design and Layout

We use [Tailwind](https://tailwindui.com/) for styling our components and pages. Note that the basic sizes and spacings have been overwritten to use pixels instead of the default rem.

Nothing is set in stone reg. layouts or color schemes. The general idea is to create a mix between Reddit and Lemmy. But we have no designer on the team(yet) so feel free to change things around.

### Server-Side Rendering

We want to leverage the powers of NextJS as much as possible. And one thing it does great is server-side rendering. We know it's not possible to create optimal user experiences if we force everything to be rendered server-side. Hence why we're not disallowing the use of client-side components. What we do ask is that as much as possible is rendered server-side. Any dynamic use of components or data should be moved as far down the DOM tree as possible. Make sure you absolutely need that `useState`(or other hook) to do what you want/need.

### Components

One of our goals with this project is to keep it as componentized as we can. Any element that's used in more than one place should be created as a separate component. This will help us create consistency and avoid creating the same or very similar components in multiple files.

### Accessibility

Making sure the frontend is accessible to all users is mandatory. This includes but is not limited to users with any level of vision, hearing, physical, and cognitive impairments.

For good resources on accessibility we recommend [WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/) and the convenient [WUHCAG Checklists](https://www.wuhcag.com/wcag-checklist/).

### Colors

While no color scheme has been solidified. We want the default colors to be neutral. Consider the fact that you and other users may spend hours looking at Sublinks pages. We should try to make it easy on the eyes.

#### Light and Dark Mode

It's an expectation that any design additions or changes look good in light and dark mode. Everything needs to be easily understandable and legible in both.

### Sizes and Spacings

In an attempt to create consistency and symmetry we want to only use pixels when styling our components. In the same sense we have a very specific set of sizing values. All of which are divisible by 4(except 2 and 0). This is one of few non-negotiable configurations of the project. Feel free to add more sizing options, as long as they're divisible by 4.

### Linting

The initial linting rules were based on the personal opinions of the repository creator. These are expected to be followed when submitting code changes. However, these rules are also up for discussion. Feel free to add or change linting rules. All we ask is that you explain your reasoning behind any such updates beyond "This is what I like/am used to". We want to prevent the linting rules changing too often based on the flavor of the week.

### Tests

Tests have not yet been set up. If you're passionate about testing, please feel free to contribute by setting up unit and end-to-end testing frameworks.

The current idea is that all utility functions should be covered by unit tests. While we want to have end-to-end tests covering key user flows when we're able to connect to a sandbox backend environment.

There is no expectation to unit or visually test standalone components.

### Pull Requests

The pull request flow in this project isn't anything special. We require a pull request to be created before anything is merged into `main`. At least one person must approve the pull request.


