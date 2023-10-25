document.addEventListener("DOMContentLoaded", function () {
    const statesDropdown = document.getElementById("states");
    const districtsDropdown = document.getElementById("districts");
    const showDataButton = document.getElementById("showData");
    const dataBody = document.getElementById("dataBody");

    // Fetch the data
    fetch('https://data.covid19india.org/v4/min/data.min.json')
        .then(response => response.json())
        .then(data => {
            // Extract state names
            const states = Object.keys(data);
            statesDropdown.innerHTML = "<option>Select State</option>";
            states.forEach(state => {
                const option = document.createElement("option");
                option.value = state;
                option.textContent = state;
                statesDropdown.appendChild(option);
            });

            // State selection event
            statesDropdown.addEventListener("change", function () {
                const selectedState = this.value;
                const selectedDistricts = Object.keys(data[selectedState].districts);

                // Update districts dropdown
                districtsDropdown.innerHTML = "<option>Select District</option>";
                selectedDistricts.forEach(district => {
                    const option = document.createElement("option");
                    option.value = district;
                    option.textContent = district;
                    districtsDropdown.appendChild(option);
                });
            });

            // Show Data button click event
            showDataButton.addEventListener("click", function () {
                const selectedState = statesDropdown.value;
                const selectedDistrict = districtsDropdown.value;

                if (selectedState !== "Select State" && selectedDistrict !== "Select District") {
                    const districtData = data[selectedState].districts[selectedDistrict];
                    const population = districtData.meta.population;
                    const confirmed = districtData.total.confirmed;
                    const deceased = districtData.total.deceased;
                    const recovered = districtData.total.recovered;
                    const vaccinated1 = districtData.total.vaccinated1;
                    const vaccinated2 = districtData.total.vaccinated2;

                    const row = dataBody.insertRow();
                    const stateCell = row.insertCell(0);
                    const districtCell = row.insertCell(1);
                    const populationCell = row.insertCell(2);
                    const confirmedCell = row.insertCell(3);
                    const deceasedCell = row.insertCell(4);
                    const recoveredCell = row.insertCell(5);
                    const vaccinated1Cell = row.insertCell(6);
                    const vaccinated2Cell = row.insertCell(7);

                    stateCell.textContent = selectedState;
                    districtCell.textContent = selectedDistrict;
                    populationCell.textContent = population;
                    confirmedCell.textContent = confirmed;
                    deceasedCell.textContent = deceased;
                    recoveredCell.textContent = recovered;
                    vaccinated1Cell.textContent = vaccinated1;
                    vaccinated2Cell.textContent = vaccinated2;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
