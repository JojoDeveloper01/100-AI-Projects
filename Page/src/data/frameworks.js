export const frameworks = [
  {
    name: 'React',
    color: '#61dafb',
    icon: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M21.718 12c0-1.429-1.339-2.681-3.467-3.5.029-.18.077-.37.1-.545.217-2.058-.273-3.543-1.379-4.182-1.235-.714-2.983-.186-4.751 1.239C10.45 3.589 8.7 3.061 7.468 3.773c-1.107.639-1.6 2.124-1.379 4.182.018.175.067.365.095.545-2.127.819-3.466 2.071-3.466 3.5 0 1.429 1.339 2.681 3.466 3.5-.028.18-.077.37-.095.545-.218 2.058.272 3.543 1.379 4.182.376.213.803.322 1.235.316a5.987 5.987 0 0 0 3.514-1.56 5.992 5.992 0 0 0 3.515 1.56 2.44 2.44 0 0 0 1.236-.316c1.106-.639 1.6-2.124 1.379-4.182-.019-.175-.067-.365-.1-.545 2.132-.819 3.471-2.071 3.471-3.5Zm-6.01-7.548a1.5 1.5 0 0 1 .76.187c.733.424 1.055 1.593.884 3.212-.012.106-.043.222-.058.33-.841-.243-1.7-.418-2.57-.523a16.165 16.165 0 0 0-1.747-1.972 4.9 4.9 0 0 1 2.731-1.234Zm-7.917 8.781c.172.34.335.68.529 1.017.194.337.395.656.6.969a14.09 14.09 0 0 1-1.607-.376 14.38 14.38 0 0 1 .478-1.61Zm-.479-4.076a14.085 14.085 0 0 1 1.607-.376c-.205.313-.405.634-.6.969-.195.335-.357.677-.529 1.017-.19-.527-.35-1.064-.478-1.61ZM8.3 12a19.32 19.32 0 0 1 .888-1.75c.33-.568.69-1.118 1.076-1.65.619-.061 1.27-.1 1.954-.1.684 0 1.333.035 1.952.1a19.63 19.63 0 0 1 1.079 1.654c.325.567.621 1.15.887 1.746a18.869 18.869 0 0 1-1.953 3.403 19.218 19.218 0 0 1-3.931 0 20.169 20.169 0 0 1-1.066-1.653A19.324 19.324 0 0 1 8.3 12Zm7.816 2.25c.2-.337.358-.677.53-1.017.191.527.35 1.065.478 1.611a14.48 14.48 0 0 1-1.607.376c.202-.314.404-.635.597-.97h.002Zm.53-3.483c-.172-.34-.335-.68-.53-1.017a20.214 20.214 0 0 0-.6-.97c.542.095 1.078.22 1.606.376a14.111 14.111 0 0 1-.478 1.611h.002ZM12.217 6.34c.4.375.777.773 1.13 1.193-.37-.02-.746-.033-1.129-.033s-.76.013-1.131.033c.353-.42.73-.817 1.13-1.193Zm-4.249-1.7a1.5 1.5 0 0 1 .76-.187 4.9 4.9 0 0 1 2.729 1.233A16.253 16.253 0 0 0 9.71 7.658c-.87.105-1.728.28-2.569.524-.015-.109-.047-.225-.058-.331-.171-1.619.151-2.787.885-3.211ZM3.718 12c0-.9.974-1.83 2.645-2.506.218.857.504 1.695.856 2.506-.352.811-.638 1.65-.856 2.506C4.692 13.83 3.718 12.9 3.718 12Zm4.25 7.361c-.734-.423-1.056-1.593-.885-3.212.011-.106.043-.222.058-.331.84.243 1.697.418 2.564.524a16.37 16.37 0 0 0 1.757 1.982c-1.421 1.109-2.714 1.488-3.494 1.037Zm3.11-2.895c.374.021.753.034 1.14.034.387 0 .765-.013 1.139-.034a14.4 14.4 0 0 1-1.14 1.215 14.248 14.248 0 0 1-1.139-1.215Zm5.39 2.895c-.782.451-2.075.072-3.5-1.038a16.248 16.248 0 0 0 1.757-1.981 16.41 16.41 0 0 0 2.565-.523c.015.108.046.224.058.33.175 1.619-.148 2.789-.88 3.212Zm1.6-4.854A16.563 16.563 0 0 0 17.216 12c.352-.812.638-1.65.856-2.507 1.671.677 2.646 1.607 2.646 2.507 0 .9-.975 1.83-2.646 2.507h-.004Z"/><path d="M12.215 13.773a1.792 1.792 0 1 0-1.786-1.8v.006a1.787 1.787 0 0 0 1.786 1.794Z"/></svg>`,
    setup: `npm install tradux`,
    usage: `
import { t, setLanguage, availableLanguages, currentLanguage } 
from "tradux"

export default function App() {
	const changeLanguage = async (e) => {
		await setLanguage(e.target.value);
		location.reload();
	};
	return (
		<div>
			<h1>React</h1>
			<h2>{t.welcome}</h2>
			<p>{t.navigation?.home}</p>
			<p>{t.navigation?.about}</p>
			<p>{t.navigation?.services}</p>

			<select value={currentLanguage} onChange={changeLanguage}>
				{availableLanguages.map(({ name, value }) => (
					<option key={value} value={value}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
}
    `
  },
  {
    name: 'Vue',
    color: '#42b883',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M14.5 3 12 7.156 9.857 3H2l10 18L22 3h-7.5ZM4.486 4.5h2.4L12 13.8l5.107-9.3h2.4L12 18.021 4.486 4.5Z"/></svg>`,
    setup: `npm install tradux`,
    usage: `
<script setup>
import { ref } from 'vue'
import { t, setLanguage, availableLanguages, currentLanguage } 
from "tradux"

const selectedLanguage = ref(currentLanguage)

const changeLanguage = async (e) => {
    const newLang = e.target.value
    const success = await setLanguage(newLang)
    if (success) {
        selectedLanguage.value = newLang
        window.location.reload()
    }
}
</script>

<template>
  <div>
    <h1>Vue</h1>
    <h2>{{ t.welcome }}</h2>
    <p>{{ t.navigation?.home }}</p>
    <p>{{ t.navigation?.about }}</p>
    <p>{{ t.navigation?.services }}</p>

    <select v-model="selectedLanguage" @change="changeLanguage">
      <option v-for="lang in availableLanguages" :key="lang.value" 
      :name="lang.name" :value="lang.value">
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>
`
  },
  {
    name: 'Svelte',
    color: '#ff3e00',
    icon: `<svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
        <title>file_type_svelte</title>
        <path
            d="M26.47,5.7A8.973,8.973,0,0,0,14.677,3.246L7.96,7.4a7.461,7.461,0,0,0-3.481,5.009,7.686,7.686,0,0,0,.8,5.058,7.358,7.358,0,0,0-1.151,2.8,7.789,7.789,0,0,0,1.4,6.028,8.977,8.977,0,0,0,11.794,2.458L24.04,24.6a7.468,7.468,0,0,0,3.481-5.009,7.673,7.673,0,0,0-.8-5.062,7.348,7.348,0,0,0,1.152-2.8A7.785,7.785,0,0,0,26.47,5.7"
            style="currentColor"></path>
        <path
            d="M14.022,26.64A5.413,5.413,0,0,1,8.3,24.581a4.678,4.678,0,0,1-.848-3.625,4.307,4.307,0,0,1,.159-.61l.127-.375.344.238a8.76,8.76,0,0,0,2.628,1.274l.245.073-.025.237a1.441,1.441,0,0,0,.271.968,1.63,1.63,0,0,0,1.743.636,1.512,1.512,0,0,0,.411-.175l6.7-4.154a1.366,1.366,0,0,0,.633-.909,1.407,1.407,0,0,0-.244-1.091,1.634,1.634,0,0,0-1.726-.622,1.509,1.509,0,0,0-.413.176l-2.572,1.584a4.934,4.934,0,0,1-1.364.582,5.415,5.415,0,0,1-5.727-2.06A4.678,4.678,0,0,1,7.811,13.1,4.507,4.507,0,0,1,9.9,10.09l6.708-4.154a4.932,4.932,0,0,1,1.364-.581A5.413,5.413,0,0,1,23.7,7.414a4.679,4.679,0,0,1,.848,3.625,4.272,4.272,0,0,1-.159.61l-.127.375-.344-.237a8.713,8.713,0,0,0-2.628-1.274l-.245-.074.025-.237a1.438,1.438,0,0,0-.272-.968,1.629,1.629,0,0,0-1.725-.622,1.484,1.484,0,0,0-.411.176l-6.722,4.14a1.353,1.353,0,0,0-.631.908,1.394,1.394,0,0,0,.244,1.092,1.634,1.634,0,0,0,1.726.621,1.538,1.538,0,0,0,.413-.175l2.562-1.585a4.9,4.9,0,0,1,1.364-.581,5.417,5.417,0,0,1,5.728,2.059,4.681,4.681,0,0,1,.843,3.625A4.5,4.5,0,0,1,22.1,21.905l-6.707,4.154a4.9,4.9,0,0,1-1.364.581"
            style="fill:#fff"></path>
    </g>
</svg>`,
    setup: `npm install tradux`,
    usage: `
<script>
  import { t, setLanguage, availableLanguages, currentLanguage } 
  from "tradux"

  function changeLanguage(event) {
    setLanguage(event.target.value);
    location.reload();
  }
</script>

<div>
  <h1>Svelte</h1>
  <h2>{t.welcome}</h2>
  <p>{t.navigation?.home}</p>
  <p>{t.navigation?.about}</p>
  <p>{t.navigation?.services}</p>

  <select value={currentLanguage} on:change={changeLanguage}>
    {#each availableLanguages as { name, value }}
      <option {value}>{name}</option>
    {/each}
  </select>
</div>
`
  },
  {
    name: 'Astro',
    color: '#691cb8',
    icon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-astro"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.972 3.483c.163 .196 .247 .46 .413 .987l3.64 11.53a15.5 15.5 0 0 0 -4.352 -1.42l-2.37 -7.723a.31 .31 0 0 0 -.296 -.213a.31 .31 0 0 0 -.295 .214l-2.342 7.718a15.5 15.5 0 0 0 -4.37 1.422l3.657 -11.53c.168 -.527 .251 -.79 .415 -.986c.144 -.172 .331 -.306 .544 -.388c.242 -.094 .527 -.094 1.099 -.094h2.612c.572 0 .858 0 1.1 .094c.213 .082 .4 .217 .545 .39" /><path d="M9 18c0 1.5 2 3 3 4c1 -1 3 -3 3 -4q -3 1.5 -6 0" /></svg>`,
    setup: `npm install tradux`,
    usage: `
<section>
    <h1>Astro</h1>

    <h2 data-key="welcome"></h2>

    <p data-key="navigation.home"></p>
    <p data-key="navigation.about"></p>
    <p data-key="navigation.services"></p>

    <select id="lang-select"></select>
</section>

<script>
    import { t, setLanguage, availableLanguages, currentLanguage } 
    from "tradux"

    const select = document.getElementById("lang-select") as HTMLSelectElement;

    availableLanguages.forEach(({ name, value }) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = name;
        option.selected = value === currentLanguage;
        select.appendChild(option);
    });

    select.onchange = (e: Event) => {
        const selectedLang = (e.target as HTMLSelectElement).value;
        if (selectedLang !== currentLanguage) {
            setLanguage(selectedLang);
            location.reload();
        }
    };

    document.querySelectorAll("[data-key]").forEach((el: Element) => {
        const key = el instanceof HTMLElement ? el.dataset.key : undefined;
        const keys = key?.split(".") ?? [];
        let value: any = t;
        keys.forEach((k: string) => (value = value?.[k]));
        if (el instanceof HTMLElement) {
            el.textContent = typeof value === "string" ? value : "";
        }
    });
</script>
    `
  },
]