<template>
    <div ref="container">
        <canvas ref="canvasRef" class="block rounded-full"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// Props
const props = defineProps({
    rotationSpeed: { type: Number, default: 0.005 }
})

// Comprehensive configuration - Change ANY aspect of the globe here
const config = {
    // Globe settings
    globe: {
        size: 550,
        radius: 1.5,
        cameraDistance: 2.4,
        autoRotationSpeed: 0.005,
        mouseRotationSpeed: 0.01,
        maxVerticalRotation: Math.PI / 2
    },

    // Interior settings
    interior: {
        enabled: true,
        radius: 1.5,
        color: 0x232c31,
        opacity: 0.7
    },

    // Wireframe settings
    wireframe: {
        enabled: true,
        radius: 1.51,
        color: 0xffffff,
        opacity: 0.05,
        segments: 7
    },

    // Countries settings
    countries: {
        enabled: true,
        radius: 1.5,
        material: {
            color: 0xffffff,
            transparent: false,
            opacity: 1.0,
            side: 'DoubleSide'
        },
        borders: {
            enabled: true,
            color: 0x333333,
            linewidth: 1,
            transparent: true,
            opacity: 0.8
        }
    },

    // Renderer settings
    renderer: {
        antialias: true,
        alpha: true,
        backgroundColor: 0x000000,
        backgroundAlpha: 0,
        shadowMap: false
    },

    // Camera settings
    camera: {
        fov: 75,
        near: 0.1,
        far: 1000
    },

    // Mouse interaction settings
    mouse: {
        enabled: true,
        grabCursor: 'grab',
        grabbingCursor: 'grabbing',
        preventDefault: true
    }
}

// Refs and variables
const container = ref(null)
const canvasRef = ref(null)
let scene, camera, renderer, earth, animationId
let isMouseDown = false, previousMouseX = 0, previousMouseY = 0

// Helper functions
const latLngToVector3 = (lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    )
}

// Create black interior sphere
const createInterior = () => {
    if (!config.interior.enabled) return null

    const geometry = new THREE.SphereGeometry(config.interior.radius, 64, 64)
    const material = new THREE.MeshBasicMaterial({
        color: config.interior.color,
        transparent: true,
        opacity: config.interior.opacity,
        side: THREE.BackSide // Render from inside
    })

    return new THREE.Mesh(geometry, material)
}

// Create wireframe sphere
const createWireframe = () => {
    if (!config.wireframe.enabled) return null

    const geometry = new THREE.SphereGeometry(config.wireframe.radius, config.wireframe.segments, config.wireframe.segments)
    const material = new THREE.MeshBasicMaterial({
        color: config.wireframe.color,
        transparent: true,
        opacity: config.wireframe.opacity,
        wireframe: true
    })

    return new THREE.Mesh(geometry, material)
}

// Load and create countries
const loadCountries = async () => {
    if (!config.countries.enabled) return

    try {
        const response = await fetch('/world_countries.geojson')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const geoData = await response.json()
        const countryGroup = new THREE.Group()

        geoData.features.forEach(feature => {
            if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                const coordinates = feature.geometry.type === 'Polygon'
                    ? [feature.geometry.coordinates]
                    : feature.geometry.coordinates

                coordinates.forEach(polygon => {
                    polygon.forEach((ring, ringIndex) => {
                        if (ringIndex === 0 && ring.length > 3) {
                            const points = ring.map(coord => latLngToVector3(coord[1], coord[0], config.countries.radius))

                            // Create filled country
                            const vertices = []
                            const indices = []
                            points.forEach(point => vertices.push(point.x, point.y, point.z))
                            for (let i = 0; i < points.length - 2; i++) {
                                indices.push(0, i + 1, i + 2)
                            }

                            const geometry = new THREE.BufferGeometry()
                            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
                            geometry.setIndex(indices)
                            geometry.computeVertexNormals()

                            const material = new THREE.MeshBasicMaterial({
                                color: config.countries.material.color,
                                transparent: config.countries.material.transparent,
                                opacity: config.countries.material.opacity,
                                side: THREE[config.countries.material.side]
                            })

                            const mesh = new THREE.Mesh(geometry, material)
                            countryGroup.add(mesh)

                            // Add country outline/border if enabled
                            if (config.countries.borders.enabled) {
                                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
                                const lineMaterial = new THREE.LineBasicMaterial({
                                    color: config.countries.borders.color,
                                    linewidth: config.countries.borders.linewidth,
                                    transparent: config.countries.borders.transparent,
                                    opacity: config.countries.borders.opacity
                                })
                                const outline = new THREE.LineLoop(lineGeometry, lineMaterial)
                                countryGroup.add(outline)
                            }
                        }
                    })
                })
            }
        })

        earth.add(countryGroup)
    } catch (error) {
        console.error('Could not load countries:', error)
    }
}

// Initialize Three.js scene
const initThree = async () => {
    // Scene setup
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(config.camera.fov, 1, config.camera.near, config.camera.far)
    camera.position.z = config.globe.cameraDistance

    renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        antialias: config.renderer.antialias,
        alpha: config.renderer.alpha
    })
    renderer.setSize(config.globe.size, config.globe.size)
    renderer.setClearColor(config.renderer.backgroundColor, config.renderer.backgroundAlpha)

    if (config.renderer.shadowMap) {
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
    }

    // Create earth group
    earth = new THREE.Group()
    scene.add(earth)

    // Add black interior
    const interior = createInterior()
    if (interior) {
        earth.add(interior)
    }

    // Add wireframe sphere
    const wireframe = createWireframe()
    if (wireframe) {
        earth.add(wireframe)
    }

    // Load countries
    await loadCountries()
}

// Animation loop
const animate = () => {
    animationId = requestAnimationFrame(animate)

    // Auto rotation
    if (!isMouseDown) {
        earth.rotation.y += props.rotationSpeed || config.globe.autoRotationSpeed
    } renderer.render(scene, camera)
}

// Mouse event handlers
const onMouseMove = (event) => {
    if (!config.mouse.enabled || !isMouseDown) return

    const deltaX = event.clientX - previousMouseX
    const deltaY = event.clientY - previousMouseY

    earth.rotation.y += deltaX * config.globe.mouseRotationSpeed
    earth.rotation.x += deltaY * config.globe.mouseRotationSpeed
    earth.rotation.x = Math.max(-config.globe.maxVerticalRotation, Math.min(config.globe.maxVerticalRotation, earth.rotation.x))

    previousMouseX = event.clientX
    previousMouseY = event.clientY
}

const onMouseDown = (event) => {
    if (!config.mouse.enabled) return

    isMouseDown = true
    previousMouseX = event.clientX
    previousMouseY = event.clientY
    container.value.style.cursor = config.mouse.grabbingCursor
    if (config.mouse.preventDefault) event.preventDefault()
}

const onMouseUp = () => {
    if (!config.mouse.enabled) return

    isMouseDown = false
    container.value.style.cursor = config.mouse.grabCursor
}

// Lifecycle
onMounted(async () => {
    await initThree()
    animate()

    if (config.mouse.enabled) {
        container.value.style.cursor = config.mouse.grabCursor
        canvasRef.value.addEventListener('mousemove', onMouseMove)
        canvasRef.value.addEventListener('mousedown', onMouseDown)
        canvasRef.value.addEventListener('mouseup', onMouseUp)
        canvasRef.value.addEventListener('mouseleave', onMouseUp)
    }
})

onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    if (renderer) renderer.dispose()
})
</script>

<style scoped>
:root {
    --globe-size: 550px;
}

canvas {
    display: block;
    max-width: var(--globe-size);
    max-height: var(--globe-size);
    width: var(--globe-size);
    height: calc(var(--globe-size) - 40%);
}
</style>