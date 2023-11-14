#ifndef MAIN_H
#define MAIN_H
#include <stdarg.h>
#include <stdio.h>
int _putchar(char c);
int _printf(const char *format, ...);
int print_character(va_list args);
int print_string(va_list args);
int print_percent(void);
int print_integer(va_list args);
int print_binary(va_list args);
int print_unsign(va_list args);
int print_octal(va_list args);
int print_hex(va_list args, char specifier);
#endif
