package com.synapse.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.getValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.compose.rememberNavController
import com.synapse.app.design.SynapseTheme
import com.synapse.app.feature.auth.AuthNavHost
import com.synapse.app.feature.auth.AuthViewModel
import com.synapse.app.feature.auth.RequireAuth
import com.synapse.app.feature.shell.AppScaffold
import dagger.hilt.android.AndroidEntryPoint

/**
 * The single activity host. Applies [SynapseTheme] using the student's persisted theme
 * choice ([RootViewModel]), gates the app shell behind [RequireAuth] (unauthenticated
 * students see [AuthNavHost] instead), and renders [AppScaffold] once signed in.
 */
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val rootViewModel: RootViewModel = hiltViewModel()
            val choice by rootViewModel.choice.collectAsStateWithLifecycle()

            SynapseTheme(choice) {
                RequireAuth(
                    authViewModel = hiltViewModel<AuthViewModel>(),
                    onSignedOut = { AuthNavHost() },
                    content = {
                        AppScaffold(
                            navController = rememberNavController(),
                            themeChoice = choice,
                            onThemeChange = rootViewModel::setChoice,
                        )
                    },
                )
            }
        }
    }
}
