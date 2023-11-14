#include "main.h"
/**
 * print_hex - Print an integer as a hexadecimal number.
 * @args: The va_list containing the integer to print.
 * @specifier: The format specifier ('x' or 'X') to specify lowercase or
 * upper case
 *
 * Return: The number of characters printed.
 */
int print_hex(va_list args, char specifier)
{
unsigned int num = va_arg(args, unsigned int);
char buffer[32];
int count = 0;

if (specifier == 'x')
snprintf(buffer, sizeof(buffer), "%x", num);
else if (specifier == 'X')
snprintf(buffer, sizeof(buffer), "%X", num);

while (buffer[count] != '\0')
{
_putchar(buffer[count]);
count++;
}
return (count);
}
