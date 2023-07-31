import React from "react";

const Loading = () => {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="70" height="70" rx="12" fill="#F59300" fill-opacity="0.1" />
      <g style={{ mixBlendMode: "multiply" }}>
        <rect x="15" y="15" width="40" height="40" fill="url(#pattern0)" />
      </g>
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1277_9377" transform="scale(0.02)" />
        </pattern>
        <image
          id="image0_1277_9377"
          width="50"
          height="50"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABOxJREFUaEPtWGkopW0YvjHIWkgMJYw9kR+2+CeTLBE/lB+SRMoWirIvaRqFH2P5Y0uZSLaZKClL2aJhlCyDxjbKljXMOZzpeuo9n+O8vu+t+ebE9D6/zul5n+W+rvu67+e+1SQSiezVq1d0d3dHGhoaJJVK6SX+V5PJZLL7+3tSV1cnmUxGampq9BL/q0mlUtlLZoLzJMbIS2ZC7kmiRp6ZpkSNPLvoJmpE1MifeUGIeeS5vc3Et9ZzeyWLGhE18ofqnb/7rXV9fU3Dw8O0uLhIGNbW1hQSEkKGhoaCKsmLiwuqqamh9vZ22tjYYJWni4sLxcTEUHp6Omlra/9nJXp1dUUDAwP07ds3VrE6OzvT27dv2R1466fHb62Ojg7Kysqivb09VsNDCyhetLS0qKKiglJSUkhTU/PJGn9paYkiIiJofX1dYT0ug/3evHnDQLKwsHiyR9Da2srucHl5KT8f601NTamkpISSk5OVzlfIIw0NDewjDCsrKwoMDGTojY6O0vLyMkMC8x8+fOBl5vT0lDw8POj79+9kY2NDpaWlbA+E6qGhIcrLy6P9/X1ycnKi+fl5XmbKysqoqKiIMWZra8vWw4iRkRHGDgbmi4uLFZiRa2RlZYXc3d3p58+fDA1cQldXV255bW0tZWRksEt9+vSJgoKClLotYAyH2Nvb09jYGL1+/VoBuYODA2bo8fExvXv3jrKzsxXmv3z5Qt7e3owpXDQ/P18+j3vBXXNyctg8wPX395fPy/NIamoq4bLBwcH0+fNnXh/Ozc2l9+/fk6+vL01MTCh1W+zs7Ghzc5M+fvxI0dHRvN2YxsZGSkxMJE9PT5qenlZgNjIyknp7eykuLo6ampp412Mt9oiKiqLOzs5/1nMaAd3w656eHgoLC+PVAJA0MzNjiJyfnzPGuAx/c3ND+vr6bB03x9edgfgdHByY5hBUHr4QwODh4SEtLCyQq6srr4ZmZ2fJx8eHDAwMCK7MrZdrBJuAemgBBz3V59LR0aHb21v68eMHmZuby5mDHyMIYJycnJCRkRFvdNne3mZREEbD4IeVJn5jADBjY2Pe9WdnZ2xvfAvQuPVyjTg6OjJG+vr6KDQ0lLfjiANweXQigYaenp4Cc0BxdXWVurq6KDw8nLdjWV9fT3BjNzc3giYevhAA5tHREX39+pWFa76O59zcHGMEZ8Mopb4WwmpdXZ0gjWCjyclJJR8uLCyk8vJyhvjMzAyZmJgoMAs2oC+wWV1dTWlpabwaiY2NpZaWFl6NJCQkUHNz89MaAZKIWnCbzMxMdiG4EeeDMBJRSyKRUH9/PzP4sQbg80hcuKilpSVVVlayyAJkEekQCXd2dpj/T01NMfd6qBEw5OXlxYxD1CooKJDP49yqqipCwMH8+Pg4+fn5KWsEk7+bR5Bn1tbWWGje2tpiPs4N+DKX4REVkWf4MjQABLNcHgkICGDMIJwLyiMcMghpyCO7u7vMci4jA1XkCbgDfv9bPYKYjzzR3d1NyPRIqkhu8fHxlJSUpMTEY2bb2toY+3jqcOdDC8jsMBQh+PH5vPXI7761/o9eMt5ag4ODLADBGKQHZHnBb63nVvkJvY9YswtFSlWVpFizqwppocyLGhGKlKqYEzWiKqSFMi9qRChSqmJO1IiqkBbKvKgRoUipijlRI6pCWijzf41GfgEFXxbaDIMCWQAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export default Loading;
