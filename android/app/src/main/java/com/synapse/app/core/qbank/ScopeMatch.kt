package com.synapse.app.core.qbank

/**
 * Matches a question's scope tags (university / year restrictions) against a
 * candidate value. An empty scope list means "unrestricted" and matches any
 * candidate, including a null one.
 */
object ScopeMatch {

    /**
     * Scope ids and the candidate id are reduced to the prefix before the
     * first `_` before comparing, so a scope of `["OMS"]` matches a candidate
     * of `"OMS_ClassA"`.
     */
    fun universityMatches(scope: List<String>, id: String?): Boolean {
        if (scope.isEmpty()) return true
        if (id == null) return false
        val candidatePrefix = id.substringBefore('_')
        return scope.any { it.substringBefore('_') == candidatePrefix }
    }

    /**
     * Scope ids and the candidate year are reduced to their digits only
     * before comparing, so a scope of `["OMS_Y2"]` matches a candidate of
     * `"2"`.
     */
    fun yearMatches(scope: List<String>, year: String?): Boolean {
        if (scope.isEmpty()) return true
        val candidateDigits = year?.filter { it.isDigit() }
        if (candidateDigits.isNullOrEmpty()) return false
        return scope.any { scopeId ->
            val scopeDigits = scopeId.filter { it.isDigit() }
            scopeDigits.isNotEmpty() && scopeDigits == candidateDigits
        }
    }
}
