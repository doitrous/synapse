pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0"
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        // mediasoup-client-android (the real ORTC<->SDP client for the study-room
        // SFU) is only published on JitPack. Scoped to its one group so
        // mavenCentral stays authoritative for everything else.
        maven {
            url = uri("https://jitpack.io")
            content { includeGroup("com.github.haiyangwu") }
        }
    }
}

rootProject.name = "Nishany"
include(":app")
