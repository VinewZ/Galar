package utils

func Filter[T any](input []T, condition func(T) bool) []T {
	var result []T
	for _, item := range input {
		if condition(item) {
			result = append(result, item)
		}
	}
	return result
}

func ContainsSubstring(s, sub string) bool {
	return len(s) >= len(sub) && s[:len(sub)] == sub
}
